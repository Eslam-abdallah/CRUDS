let title =document.getElementById('title');
let price =document.getElementById('price');
let taxes =document.getElementById('taxes');
let ads =document.getElementById('ads');
let discount =document.getElementById('discount');
let totle =document.getElementById('totle');
let count =document.getElementById('count');
let category =document.getElementById('category');
let submit =document.getElementById('submit');
let deletAll =document.getElementById('deletAll');
let mood ='create';
let temp;





    // Get totle
    function totlepro(){
        if(price.value != ''){
            finprice =(+price.value + +taxes.value + +ads.value) - +discount.value;
            totle.innerHTML =finprice;
            totle.style.backgroundColor='green';
        }else{
            totle.innerHTML ='';
            totle.style.backgroundColor='red';
        }

    }
    //Check localStorage Date
    let newpro;
    if(localStorage.savepro != null){
        newpro =JSON.parse(localStorage.savepro)
    }else{
        newpro=[];
    }
    //create Date
    submit.onclick =function(){
    let products={
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        totle:totle.innerHTML,
        count:count.value,
        category:category.value,
    }
    if(title.value != ''&& price.value != '' && category.value != '' && count.value < 100 ){
        title.style.border=""
        price.style.border=""
        count.style.border=""
        category.style.border=""
            if(mood === 'create'){
                if(count.value > 1){
            for (let x = 0; x < count.value; x++) {
                newpro.push(products);
                localStorage.setItem('savepro' , JSON.stringify(newpro));        
            }
            }else{
                newpro.push(products);
                localStorage.setItem('savepro' , JSON.stringify(newpro));
            }
    }else{
        newpro[temp] =products;
        localStorage.setItem('savepro' , JSON.stringify(newpro));
        mood='create'
        count.style.display='block';
        submit.innerHTML='Create'
        clearDate();
        totlepro()
    }
    }else{
        alert("Please Cheack Your Date!!")
    }

    clearDate();
    showDate();
    }
    // Clear Date
    function clearDate(){
        title.value ='';
        price.value ='';
        taxes.value ='';
        ads.value ='';
        discount.value ='';
        totle.value ='';
        count.value ='';
        category.value =''
        totle.innerHTML ='';
    }
    // Show Date
    function showDate(){
        let tablea ='';
        for (let i = 0; i < newpro.length; i++) {
            tablea += `
            <tr>
            <td>${i + 1}</td>
            <td>${newpro[i].title}</td>
            <td>${newpro[i].price}</td>
            <td>${newpro[i].taxes}</td>
            <td>${newpro[i].ads}</td>
            <td>${newpro[i].discount}</td>
            <td>${newpro[i].totle}</td>
            <td>${newpro[i].category}</td>
            <td><button id="update" onclick="updateDate(${i})" type="button"><i class="fa-solid fa-pen-to-square"></i></button></td>
            <td><button id="delete" onclick="deleteDate(${i})" class="delete"><i class="fa-solid fa-trash"></i></button></td>
            </tr>
            `;
        }
            document.getElementById('tbody').innerHTML = tablea;
            deletAlld()
    }
    showDate();         
    //Remove Item
    function deleteDate(i){
        newpro.splice(i,1);
        localStorage.savepro =JSON.stringify(newpro);
        showDate();
    }
    //Add Btn RemoveAll Date
    function deletAlld(){
        if(newpro.length >1){
            deletAll.innerHTML =`
            <button onclick="RemovAll()">Delete All (${newpro.length})</button>
            `
        }else{
            deletAll.innerHTML =``
        }
    }
    // RemoveAll Date
    function RemovAll(){
        newpro.splice(0);
        localStorage.clear();
        showDate();
    }

    // Update Date
    function updateDate(i){
        mood='update'
        temp=i;
        title.value =newpro[i].title
        price.value =newpro[i].price
        taxes.value =newpro[i].taxes
        ads.value =newpro[i].ads
        discount.value =newpro[i].discount
        totlepro()
        count.style.display='none';
        category.value =newpro[i].category
        submit.innerHTML='Update'
        scroll({ top: 0, behavior: 'smooth' })
    }
    //Live Search
    let search=document.getElementById('search');
    function searchTitle(value){
        let tablea='';
        for (let i = 0; i < newpro.length; i++) {
            if(newpro[i].title.includes(value.toLowerCase())){
                tablea += `
                <tr>
                <td>${i + 1}</td>
                <td>${newpro[i].title}</td>
                <td>${newpro[i].price}</td>
                <td>${newpro[i].taxes}</td>
                <td>${newpro[i].ads}</td>
                <td>${newpro[i].discount}</td>
                <td>${newpro[i].totle}</td>
                <td>${newpro[i].category}</td>
                <td><button onclick="updateDate(${i})" type="button">Update</button></td>
                <td><button onclick="deleteDate(${i})" class="delete">Delete</button></td>
                </tr>
                `;
            }
        }
        document.getElementById('tbody').innerHTML = tablea;

    }
    //Print
    function printDiv(){
        var printContents = document.getElementById('view').innerHTML;
        var originalContents = document.body.innerHTML;

        document.body.innerHTML = printContents;

        window.print();

        document.body.innerHTML = originalContents;
    }