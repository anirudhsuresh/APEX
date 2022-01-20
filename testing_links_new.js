// function add_links(){
    // var month= document.getElementById("MaxIncubation").value;
    var start_date = JSON.parse(readTextFile("start_date_dict.json")); 
    var name_proj = "Subversion [graduated]"
    var c_month = JSON.parse(readTextFile("month_names_dict.json"));
    var p_ids=name_to_id[name_proj]
    var ac_date=start_date[p_ids]

    console.log(ac_date)


// }