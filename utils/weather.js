console.log("Happy Weather")
let address = {
    api_key : "b8578d4c622040c9853e71f21c260f62",
    fetchLocation : function(){
        document.querySelector('input').placeholder='Locating your city ...'
        let url =`https://ipgeolocation.abstractapi.com/v1/?api_key=${this.api_key}`
        fetch(url)
        .then((response)=>response.json())
        .then((data)=>{
            // console.log(data);
            let {city} = data
            let {country} = data
            if (city)
            weather.fetchWeather(city)
            else 
            weather.fetchWeather(country)
        })
        .catch((err)=>{
            weather.fetchWeather('Mumbai')
        })
    }
}
let weather = {
    api_key : "09bf15dcf2b914980476116f8f3aa54a",
    fetchWeather : function (city){
        let url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.api_key}&units=metric`
        document.querySelector('input').placeholder='Loading ...'
        fetch(url)
        .then((response)=>response.json())
        .then((data)=>this.displayWeather(data))
        .catch((err)=>{
            document.querySelector('.details').innerHTML=`
            <p>Sorry City not found</p>
        `
        document.querySelector('input').placeholder='Enter a city ...'
        })
    },
    displayWeather : function (data){
        let {name, base} = data
        let {temp, temp_min, temp_max} = data.main
        let {description, icon} = data.weather[0]
        let {speed} = data.wind

        document.querySelector('.details').innerHTML=`
        <p>Name : ${name}</p>
        <p>Temp : ${temp} &deg C;</p>
        <img id="icon" src="https://openweathermap.org/img/wn/${icon}.png"></img>
        <p>Wind Speed : ${speed} m/s</p>
        <p>Description : ${description}</p>
        `
        document.querySelector('input').placeholder='Enter a city ...'

        // console.log(name,temp,temp_min,temp_max,description,icon,base);
    },
    search : function(){
        let input = document.getElementById('input').value;
        let correctInput=input.split(/\s+/)
        let searchString = ""
        for(blocks of correctInput)
        {
            if(blocks!="")
            searchString+=blocks+" ";

        }
        // console.log(searchString);
        
        input=searchString
        if(input.search(/[^a-z\s]/i)!=-1 || input.length>20 || input.length==0)
        {   
            document.getElementById('input').value=""
            document.querySelector('input').placeholder='You made a typo !!!'
        }
        else 
        {
            
            this.fetchWeather(input)
            document.getElementById('input').value=""
        }
    }
}


document.querySelector('.search').addEventListener('click',()=>{
    weather.search()
})

document.querySelector('#input').addEventListener('keyup',(e)=>{
    if(e.key=="Enter")
    weather.search()
})

// call for fetch location
address.fetchLocation()