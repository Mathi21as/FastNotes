export function menuLogic(){
    let ulContainer = document.getElementsByClassName("ul-container");

    if(ulContainer[0].style.display === "")
        ulContainer[0].style.display = "none";
    
    ulContainer[0].style.display = ulContainer[0].style.display === "none" ? "block" : "none";
}