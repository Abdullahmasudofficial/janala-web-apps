const createlements= (array)=>{
    const htmlElements=array.map((element)=> `<span class="bg-sky-100  btn">${element}</span>`);
    return(htmlElements.join(" "));
}



const manageSpinner=(status)=>{

    if(status== true){
        document.getElementById("spinner").classList.remove("hidden");
        document.getElementById("word-section").classList.add("hidden");
        

    }

    else{
        document.getElementById("spinner").classList.add("hidden");
        document.getElementById("word-section").classList.remove("hidden");
    }

}



const loadallLessonData=()=>{
// promis for response
fetch("https://openapi.programming-hero.com/api/levels/all") 
// promise for json data 
.then((response)=>response.json())
.then((data)=>displayTheLessonInUi(data.data))
}



const removeActiveClass=()=>{
    const lessonbtn=document.querySelectorAll(".lessen-btn")
    lessonbtn.forEach((btn)=>btn.classList.remove("active-active"))

}


const loadLavelWord= (id) =>{

    manageSpinner(true);
    const url=`https://openapi.programming-hero.com/api/level/${id}`

    fetch(url)
    .then((response)=>response.json())
    .then((data)=>{

        removeActiveClass()    //remove active class
        const clickButtonForLissenButton=document.getElementById(`lesson-button-${id}`)
        clickButtonForLissenButton.classList.add("active-active") //add active class
        displaytheWordInUi(data.data)
    })
}

const loadWordDetails=async (id) =>{
const url=`https://openapi.programming-hero.com/api/word/${id}`
const res=await fetch(url);
const details=await res.json()
displayTheWordDeteils(details.data)


}


const displayTheWordDeteils=(word)=>{
    console.log(word)
    const detailsbox=document.getElementById("deteils-container");



// {
//     "word": "Eager",
//     "meaning": "আগ্রহী",
//     "pronunciation": "ইগার",
//     "level": 1,
//     "sentence": "The kids were eager to open their gifts.",
//     "points": 1,
//     "partsOfSpeech": "adjective",
//     "synonyms": [
//         "enthusiastic",
//         "excited",
//         "keen"
//     ],
//     "id": 5
// }



    detailsbox.innerHTML=`
         

<div class=" rounded-xl space-y-5  bangla-">

  <div class="space-y-5 p-5  mx-4 border border-gray-100 rounded-xl">
            <h1 class="font-bold text-4xl">${word.word}(<i class="fa-solid fa-microphone"></i>: ${word.pronunciation})</h1>
        <div>
           <h3 class="text-2xl font-semibold">Meaning</h3>
           <h3 class="text-2xl bangla-font font-medium">${word.meaning}</h3>
        </div>


       <div>
         <h2 class="text-2xl font-semibold">Example</h2>
         <p class="text-gray-700 text-xl">${word.sentence}</p>
       </div>


        <p class="bangla-font text-2xl font-semibold" >সমার্থক শব্দ গুলো</p>

        <div class="flex gap-x-2 items-center text-center text-gray-600 "> 
          ${createlements(word.synonyms)}
        
        </div>
  </div>


    
    
    
    `;
    document.getElementById("my_modal_1").showModal()
}

const displaytheWordInUi=(words)=>{
    const wordSection=document.getElementById("word-section")
    wordSection.innerHTML="";


    if(words.length==0){
        wordSection.innerHTML=`
        
      <div class="col-span-full text-center space-y-5">
      <img class="opacity-65 mx-auto" src="./assets/alert-error.png" alt="">
      <h1 class="bangla-font text-gray-600">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</h1>
      <h1 class="font-bold text-4xl bangla-font">নেক্সট Lesson এ যান।</h1>
    </div>
        
        
        `;
    
        manageSpinner(false);
        return;
    }

// {
//     "id": 144,
//     "level": 5,
//     "word": "Ostentatious",
//     "meaning": "প্রদর্শনমূলক",
//     "pronunciation": "অস্টেন্টেশন"
// }






    words.forEach(word => {
     
      const wordBtn=document.createElement("div")
      wordBtn.innerHTML=` <div class=" rounded-xl text-center shadow-md bg-white px-5 space-y-4 p-10">
      <h1 class="text-[32px] font-bold">${word.word ? word.word : "  শব্দ পাওয়া যায়নি " }</h1>
      <p class="text-xl">Meaning /Pronounciation</p>
      <h3 class="bangla-font text-3xl font-semibold">" ${word.meaning ?word.meaning :"অর্থ পাওয়া যায়নি"} / ${word.pronunciation ?word.pronunciation:"pronunciation পাওয়া যায়নি"}"</h3>
       <div class="flex justify-between items-center">
         <button onclick="loadWordDetails(${word.id})" class="bg-sky-100 btn"><i class="fa-solid fa-circle-info"></i></button>
         <button class="bg-sky-100 btn"><i class="fa-solid fa-volume-high"></i></button>


       </div>

    </div>


      `

      wordSection.append(wordBtn)
    });

    manageSpinner(false)

}

const displayTheLessonInUi=(lessons)=>{
    const leesonCardlist=document.getElementById("lesson-section-cardlist")
    leesonCardlist.innerHTML="";


for(let lesson of lessons){
   


    const btnDiv=document.createElement("div")
    btnDiv.innerHTML=`
    
    <button id="lesson-button-${lesson.level_no}" onclick="loadLavelWord(${lesson.level_no})" class=" btn btn-soft btn-primary lessen-btn"><i class="fa-solid fa-book-open"></i> Lesson- ${lesson.level_no}</button>
    
    
    `

    leesonCardlist.append(btnDiv)
    
}

};


loadallLessonData()



document.getElementById("search-btn").addEventListener("click",()=>{

removeActiveClass();

const input=document.getElementById("search-input").value.tr ;
// const inputValue=input.value.trim().tolowarCase();

console.log(input)






})