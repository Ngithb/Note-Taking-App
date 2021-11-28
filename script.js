//Ngithb

//local storage
const localstrg=()=>{
    const txtArea =document.querySelectorAll('.text');
    //making an empty array to save all the notes
    const notes =[];
    //using foreach to save all the notes into the empty notes array
    txtArea.forEach((note)=>{
        return notes.push(note.value);
    });

    //saving all data in local storage
    localStorage.setItem('notes',JSON.stringify(notes));

}

// getting the reference of add class
const add = document.querySelector('.add');


//defining the function of click event of add note button 
const htmlData= (text='')=>{
    //generating html content through js
    const note =document.createElement('div');
    note.classList.add('content');
    note.insertAdjacentHTML('afterbegin',` <button class="edit">Edit</button>
    <button class="delete">Delete</button>
    <textarea class="text ${text? "hide":""} "></textarea>
    <div class="main ${text?"":"hide"} "></div>`);

    //taking reference of the following
    const edit =note.querySelector('.edit');
    const del =note.querySelector('.delete');
    const textArea=note.querySelector('.text');
    const main=note.querySelector('.main');

    //deleting the note
    del.addEventListener('click',()=>{
        note.remove();
        //to delete the note from localstorage
        localstrg();

    })

    //to get the values of written text, also useful to get the text from localstorage
   textArea.value=text;
   main.innerHTML=text;

    //clicking on the edit button
    edit.addEventListener('click',()=>{
        textArea.classList.toggle('hide');
        main.classList.toggle('hide');
    })



    //showing the already written text on clicking edit
    textArea.addEventListener('change',(event)=>{
        const value =event.target.value;
        main.innerHTML=value;
        localstrg();
    })

    // for adding the notes
    document.body.appendChild(note);
};

//getting data from localstorage
const notes = JSON.parse(localStorage.getItem('notes'));
if (notes) {
    //to get each and every saved note from localstorage
    notes.forEach((note)=>htmlData(note));
}
// console.log(notes);

// click event on add note button
add.addEventListener('click',()=>htmlData());