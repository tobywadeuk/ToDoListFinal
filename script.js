let newitembutton = document.querySelector(".newitembutton")
let newiteminput = document.getElementById("newiteminput")
let container = document.getElementById("container")
let mainmain = document.getElementById("mainmain")
let mainprimary = document.getElementById("mainprimary")
let defaultbutton = document.getElementById("default")
let healthbutton = document.getElementById("health")
let wealthbutton = document.getElementById("wealth")
let newprojectbutton = document.getElementById("newproject")
let sidebarmain = document.getElementById("sidebarmain")
let maintitle = document.getElementById("maintitle")

let addnew = document.getElementById("addnew")
let enternewitem = document.getElementById("enternewitem")

let editnameinput = document.getElementById("editnameinput")
let editstatusinput = document.getElementById("editstatusinput")
let editprojectinput = document.getElementById("editprojectinput")
let editduedateinput = document.getElementById("editduedateinput")
let editpriorityinput = document.getElementById("editpriorityinput")
let edititembutton = document.getElementById("edititembutton")

let thisid = ""

let projectarr = []

let chosenproject = "All Projects"

let items = []
let itemdivs = []

let settingsbutton = document.getElementById("settingsbutton")
let resetbutton = document.getElementById("resetbutton")

let duedatehidden = false
let priorityhidden = false

newitembutton.addEventListener("click", function () {
    randomarr = [
        "Go to the shops",
        "Buy some alcohol",
        "Go the gym",
        "Have a coffee",
        "Have a stretch",
        "Meditate",
        "Listen to some music",
        "Have lunch",
        "Go on a walk",
        "Do some work"
    ]
    let newitemname = document.getElementById("newitemname").value

    if (newitemname == "") {
        newitemname = randomarr[Math.floor(Math.random() * 10)]
    } else {
        newitemname = document.getElementById("newitemname").value
    }
    console.log(newitemname)

    let newitemproject = document.getElementById("projectbox").value
    let newitemduedate = document.getElementById("newitemduedate").value
    let newitempriority = document.getElementById("newitempriority").value

    new Item(newitemname, " ", "false", newitemproject, newitemduedate, newitempriority);
})

let Item = function (name, id, status, project, duedate, priority) {
    this.name = name;
    this.id = (items.length);
    this.status = status;
    this.project = project;
    this.duedate = duedate;
    this.priority = priority;
    items.push(this);
    updateDOM()
};

function updateDOM() {
    saveProject()
    // delete all item divs
    let allitemdivs = Array.from(document.querySelectorAll(".itemdiv"))
    for (i = 0; i < allitemdivs.length; i++) {
        allitemdivs[i].remove()
    }

    // add em all back
    for (i = 0; i < items.length; i++) {
        if (chosenproject == "All Projects") {
            addItemToList(items[i].name, i, items[i].status, items[i].project, items[i].duedate, items[i].priority)
        }
        else if (items[i].project == chosenproject) {
            addItemToList(items[i].name, i, items[i].status, items[i].project, items[i].duedate, items[i].priority)
        } else {
            console.log("do nothing")
        }
    }

    let thisarr = Array.from(document.getElementsByClassName("projects"))

    console.log(thisarr)
    for (i = 0; i < thisarr.length; i++) {
        if (maintitle.textContent == thisarr[i].textContent) {
            thisarr[i].classList.add("classOn")
        } else {
            thisarr[i].classList.remove("classOn")
        }
    }

    if (duedatehidden == true) {
        hideDueDate()
    }

    if (priorityhidden == true) {
        hidePriority()
    }
}

function addItemToList(name, id, status, project, duedate, priority) {
    let itemdiv = document.createElement("div")
    itemdiv.className = "itemdiv"
    // mainmain.appendChild(itemdiv)
    mainprimary.appendChild(itemdiv)
    itemdiv.setAttribute("id", id)

    let checkboxbtn = document.createElement("input")
    checkboxbtn.classList.add("checkboxbtn")
    checkboxbtn.type = "checkbox"

    if (items[id].status == "false") {
        checkboxbtn.checked = false
    } else if (items[id].status == "true") {
        checkboxbtn.checked = true
        let thisdiv = document.getElementById(id)
        thisdiv.style.backgroundColor = "green"
        thisdiv.style.opacity = "75%"
    }

    let checkboxtxt = document.createTextNode(status)
    checkboxbtn.appendChild(checkboxtxt)
    itemdiv.appendChild(checkboxbtn)

    checkboxbtn.addEventListener("click", function () {
        let thisid = this.parentElement.id
        if (items[thisid].status == "false") {
            items[thisid].status = "true";
        } else if (items[thisid].status == "true") {
            items[thisid].status = "false";
        }
        updateDOM()
    })


    let itemtitlep = document.createElement("p")
    let itemtitletxt = document.createTextNode(name)
    itemtitlep.classList.add("itemtitletxt")
    itemtitlep.appendChild(itemtitletxt)
    itemdiv.appendChild(itemtitlep)


    itemtitlep.addEventListener("click", function () {
        let thisid = this.parentElement.id
        let thisidplusone = parseInt(thisid) + 1;
        items.unshift(items[thisid])
        items.splice(thisidplusone, 1)
        updateDOM()
    })

    // itemdiv.addEventListener("click", function(){
    //     let thisid = this.id;
    //     let thisidplusone = parseInt(thisid) + 1;
    //     items.unshift(items[thisid])
    //     items.splice(thisidplusone,1)
    //     updateDOM()
    // })

    // let orderp = document.createElement("p")
    // let ordertxt = document.createTextNode(id + 1)
    // orderp.classList.add("ordertxt")
    // orderp.appendChild(ordertxt)
    // itemdiv.appendChild(orderp)


    // let projectp = document.createElement("p")
    // let projecttxt = document.createTextNode(project)
    // projectp.style.borderBottom = "blue solid 1px"
    // projectp.style.padding = "3px"
    // projectp.appendChild(projecttxt)
    // itemdiv.appendChild(projectp)


    let duedatep = document.createElement("p")
    let duedatetxt = document.createTextNode(duedate)
    duedatep.classList.add("duedatep");
    duedatep.appendChild(duedatetxt)
    itemdiv.appendChild(duedatep)
    duedatep.addEventListener("click", hideDueDate)

    let priorityp = document.createElement("p")
    let prioritytext = document.createTextNode(priority)
    priority == ("High") ? priorityp.style.color = "red" : priority == ("Medium") ? priorityp.style.color = "goldenrod" : priority == ("Low") ? priorityp.style.color = "green" : console.log("hi");
    priorityp.appendChild(prioritytext)
    priorityp.classList.add("priorityp");
    itemdiv.appendChild(priorityp)
    priorityp.addEventListener("click", hidePriority)


    let editbtn = document.createElement("button")
    let edittxt = document.createTextNode("edit")
    editbtn.classList.add("itemdivbtn")
    editbtn.appendChild(edittxt)
    itemdiv.appendChild(editbtn)

    editbtn.addEventListener("click", function () {

        thisid = this.parentElement.id
        modalbackground.style.display = "block";

        // populate fields with existing details

        editnameinput.value = items[thisid].name
        projectboxone.value = items[thisid].project
        editduedateinput.value = items[thisid].duedate
        console.log(editpriorityinput)
        editpriorityinput.checked = items[thisid].priority
    })

    let deletebtn = document.createElement("button")
    let deletetxt = document.createTextNode("delete")
    deletebtn.classList.add("itemdivbtn")
    deletebtn.classList.add("itemdivdeletebtn")
    deletebtn.appendChild(deletetxt)
    itemdiv.appendChild(deletebtn)

    deletebtn.addEventListener("click", function () {
        let thisid = this.parentElement.id
        items.splice(thisid, 1)
        updateDOM()
    })
}

edititembutton.addEventListener("click", function () {
    items[thisid].name = editnameinput.value
    items[thisid].project = projectboxone.value
    items[thisid].duedate = editduedateinput.value
    items[thisid].priority = editpriorityinput.value
    updateDOM()
    modalbackground.style.display = "none";
})


newprojectbutton.addEventListener("click", function () {
    let newprojectname = prompt("Would you like to add a Project?")
    if (newprojectname.length > 0) {
        updateProjects(newprojectname)
    }
})

function addProjectToDOM(newprojectname) {
    let newprojectp = document.createElement("p")
    let newprojecttxt = document.createTextNode(newprojectname)
    newprojectp.appendChild(newprojecttxt)
    newprojectp.setAttribute("class", "projects")
    sidebarmain.appendChild(newprojectp)

    newprojectp.addEventListener("click", function () {
        chosenproject = newprojectname
        let newprojecttxttwo = document.createTextNode(newprojectname)
        maintitle.textContent = "";
        maintitle.appendChild(newprojecttxttwo);
        updateDOM()
    })

    let alloptions = Array.from(document.querySelectorAll(".optionclass"))
    for (i = 0; i < alloptions.length; i++) {
        alloptions[i].remove()
    }

    projectarr.forEach(item => {
        if (item == "All Projects") {
            // console.log("do nothing")
        } else {
            let option = document.createElement("option");
            option.classList.add("optionclass")
            option.innerHTML = item;
            projectbox.appendChild(option);

            let optionone = document.createElement("option");
            optionone.classList.add("optionclass")
            optionone.innerHTML = item;
            projectboxone.appendChild(optionone);
        }
    })
}

function updateProjects(newprojectname) {
    if (newprojectname !== "none") {
        projectarr.push(newprojectname)
        addProjectToDOM(newprojectname)
    }

}

let projectbox = document.getElementById("projectbox")
let projectboxone = document.getElementById("projectboxone")

updateProjects("All Projects")
updateProjects("Main")

function hideIt() {
    enternewitem.classList.toggle("hidden")

}
addnew.addEventListener("click", function () {
    hideIt()
})

addnew.addEventListener("click", function () {
    let addnewtext = this.textContent.trim();
    if (addnewtext == "Add New Item") {
        addnew.textContent = "Hide";
    } else if (addnewtext == "Hide") {
        addnew.textContent = "Add New Item";
    }
})

hideIt()
// when add new is clicked
// show enternewitem

let modalstuff = document.getElementById("modalstuff")
let modalbutton = document.getElementById("modalbutton")
let modalcontent = document.getElementById("modalcontent")
let modalbackground = document.getElementById("modalbackground")
let modaltext = document.getElementById("modaltext")
let close = document.getElementById("close")

close.addEventListener("click", function () {
    modalbackground.style.display = "none";
})

window.addEventListener("click", function (event) {
    if (event.target == modalbackground) {
        modalbackground.style.display = "none";
    }
})



// new Item("food", " ", "false", "Main", "Today", "High")


function saveProject() {
    // Set up a function that saves the projects (and todos) to localStorage every time a new project (or todo) is created
    localStorage.items = JSON.stringify(items);
    localStorage.projectarr = JSON.stringify(projectarr);
}

function loadProject() {
    items = JSON.parse(localStorage.items);
    projectarr = JSON.parse(localStorage.projectarr)

    for (let i = 2; i < projectarr.length; i++) {
        addProjectToDOM(projectarr[i])
    }

    updateDOM()
}

resetbutton.addEventListener("click", function () {
    let prompty = prompt("Type YES to confirm")
    if (prompty == "YES") {
        localStorage.clear()
        location.reload()
    }
})

function hideDueDate() {
    duedatehidden = true;
    let duedatearr = Array.from(document.querySelectorAll(".duedatep"))
    for (i = 0; i < duedatearr.length; i++) {
        duedatearr[i].style.display = "none";
    }
    settingsbutton.style.display = "inline-block"
}

function hidePriority() {
    priorityhidden = true;
    let priorityarr = Array.from(document.querySelectorAll(".priorityp"))
    for (i = 0; i < priorityarr.length; i++) {
        priorityarr[i].style.display = "none";
    }
    settingsbutton.style.display = "inline-block"
}

settingsbutton.addEventListener("click", function () {
    priorityhidden = false;
    duedatehidden = false;
    let duedatearr = Array.from(document.querySelectorAll(".duedatep"))
    let priorityarr = Array.from(document.querySelectorAll(".priorityp"))
    for (i = 0; i < duedatearr.length; i++) {
        duedatearr[i].style.display = "block";
        priorityarr[i].style.display = "block";
    }
    settingsbutton.style.display = "none"
})

settingsbutton.style.display = "none"

if (!localStorage.getItem("items")) {
    console.log("No Storage")
} else {
    loadProject()
}

// features

// click to push to top
// click on priority or due date to hide that features
