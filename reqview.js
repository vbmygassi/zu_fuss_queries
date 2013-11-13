http = require("http");

ids = [10000];
ids = [10000, 100, 10];

keys = ""; comma = ""; 
for(idx in ids){
	keys += comma +'"' +ids[idx] +'"';
	comma = ',';
}

options = { 
	host: "127.0.0.1", 
	port: 8092, 
	path: "/default/_design/adminpanel/_view/documents_by_ids?keys=[" +keys +"]" 
};

buff = "";
request = http.request(options, function(res){
	res.on("data", function(chunk){
		buff +=chunk;
	});
	res.on("end", function(){
		json = JSON.parse(buff);
		logResult(json);		
	});
});
request.on("error", function(err){
	console.log(err);
});
request.end();

logResult = function(obj){
	if(null == obj.rows){
		console.log(obj);
	}
	for(idx in obj.rows){
		console.log(obj.rows[idx]);
	}
}

