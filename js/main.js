class Task{
constructor(key, title, isCompleted){
    this.Key = key;
    this.Title = title;
    this.IsCompleted = isCompleted;
}
};

window.addEventListener("load", function(){
    getUnCompletedTasks();
    getCompletedTasks();
    makeClickEvent();
    console.log(localStorage);
});

function makeClickEvent(){
    var uncompletedTaskElements = document.querySelectorAll("#uncompletedTasks .task a");

    uncompletedTaskElements.forEach(element=>{
        if(element.tagName === "A"){
            element.classList.forEach(cls=>{
                if(cls === "btn-completed"){
                    element.addEventListener("click", function(e)
                    {
                        var parEl = e.target.parentElement;
    
                        for(let i = 0; i < e.composedPath().length; i++)
                        {
                            if(parEl != null)
                            {
                                parEl.classList.forEach(x=>{
                                    if(x != null){
                                        if(x === "task")
                                        {
                                            updateTask(parEl.outerText, true);
                                        }
                                    }
                                });
                                parEl = parEl.parentElement;
                            }   
                        }
                    });
                }
                else if(cls === "btn-delete"){
                    element.addEventListener("click", function(e)
                    {
                        var parEl = e.target.parentElement;
    
                        for(let i = 0; i < e.composedPath().length; i++)
                        {
                            if(parEl != null)
                            {
                                parEl.classList.forEach(x=>{
                                    if(x != null){
                                        if(x === "task")
                                        {
                                            removeTask(parEl.outerText);
                                        }
                                    }
                                });
                                parEl = parEl.parentElement;
                            }   
                        }
                    });
                }
            });
        }
    
    });

    var completedTaskElements = document.querySelectorAll("#completedTasks .task a");

    completedTaskElements.forEach(element=>{
        if(element.tagName === "A"){
            element.classList.forEach(cls=>{
                if(cls === "btn-undo"){
                    element.addEventListener("click", function(e)
                    {
                        var parEl = e.target.parentElement;
    
                        for(let i = 0; i < e.composedPath().length; i++)
                        {
                            if(parEl != null)
                            {
                                parEl.classList.forEach(x=>{
                                    if(x != null){
                                        if(x === "task")
                                        {
                                            updateTask(parEl.outerText, false);
                                        }
                                    }
                                });
                                parEl = parEl.parentElement;
                            }   
                        }
                    });
                }
                else if(cls === "btn-delete"){
                    element.addEventListener("click", function(e)
                    {
                        var parEl = e.target.parentElement;
    
                        for(let i = 0; i < e.composedPath().length; i++)
                        {
                            if(parEl != null)
                            {
                                parEl.classList.forEach(x=>{
                                    if(x != null){
                                        if(x === "task")
                                        {
                                            removeTask(parEl.outerText);
                                        }
                                    }
                                });
                                parEl = parEl.parentElement;
                            }   
                        }
                    });
                }
            });
        }
    
    });

}

function getTaskByTitle(crudeTitle){
    for(var i = 0; i <= localStorage.length + 1; i++){

        var key = localStorage.key(i);

        var storeItem = localStorage.getItem(key);

        var taskDeserialize = JSON.parse(storeItem);

        if(taskDeserialize != null && taskDeserialize.Title === crudeTitle){
            var task = new Task(taskDeserialize.Key, taskDeserialize.Title, taskDeserialize.IsCompleted);
            console.log("GetTaskByTitle "+task);
            return task;
        }
    }
}

function removeTask(crudeTitle){

    var task = getTaskByTitle(crudeTitle);

    localStorage.removeItem(task.Key);

    location.reload();
}

function updateTask(crudeTitle, isCompleted){

    var task = getTaskByTitle(crudeTitle);

    localStorage.removeItem(task.Key);

    task.IsCompleted = isCompleted;

    addTask(task.Title, isCompleted);

    location.reload();
}

function newTaskModal(){

    alertify.prompt('Lütfen Görev İçeriğini Yazınız.', '', function(evt, value) { 
        addTask(value, false);
    });

}

function addTask(crudeTitle, isCompleted){

    var id = uuid();

    var task = new Task(id,crudeTitle, isCompleted);

    var serializeTask = JSON.stringify(task);

    localStorage.setItem(id, serializeTask);

    alertify.success('Görev Oluşturuldu!');

    location.reload();

}

function getCompletedTasks(){
    var completedTaskElement = document.getElementById("completedTasks");
    for(var i = 0; i <= localStorage.length + 1; i++){

        var key = localStorage.key(i);

        var storeItem = localStorage.getItem(key);

        if(storeItem != null)
        {
            var task = JSON.parse(storeItem);

            if(task.IsCompleted == true){
                completedTaskElement.innerHTML += `
                <div class="task row m-0 p-0 bg-dark text-white">
                <div class="col-10 p-0">
                    <h1 class="task-content fw-normal fs-5 mt-2">${task.Title}</h1>
                </div>
                <div class="col-1 p-0 h-100">
                    <a class="btn btn-warning btn-undo px-0 w-100 h-100">
                    <i class="fas fa-reply-all"></i>
                    </a>
                </div>
                <div class="col-1 p-0 h-100">
                    <a class="btn btn-danger btn-delete px-0 w-100 h-100">
                    <i class="fas fa-trash-alt"></i>
                    </a>
                </div>
                </div>
                `;
            }
        }
    }
}

function getUnCompletedTasks(){
    var umcompletedTaskElement = document.getElementById("uncompletedTasks");
    for(let i = 0; i <= localStorage.length + 1; i++){

        var key = localStorage.key(i);

        var storeItem = localStorage.getItem(key);

        if(storeItem != null)
        {
            var task = JSON.parse(storeItem);

            if(task.IsCompleted == false){
                umcompletedTaskElement.innerHTML += `
                <div class="task row m-0">
                <div class="col-10 p-0">
                    <h1 class="task-content fw-normal fs-5 mt-2">${task.Title}</h1>
                </div>
                <div class="col-1 p-0 h-100">
                    <a class="btn btn-success btn-completed px-0 w-100 h-100">
                    <i class="far fa-check-square"></i>
                    </a>
                </div>
                <div class="col-1 p-0 h-100">
                    <a class="btn btn-danger btn-delete px-0 w-100 h-100">
                    <i class="fas fa-trash-alt"></i>
                    </a>
                </div>
                </div>
                `;
            }
        }
    }
}