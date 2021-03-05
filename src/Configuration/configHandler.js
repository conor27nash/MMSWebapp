let upsertConfig = `https://mmsdata.azurewebsites.net/api/MMSConfigUpsert`;

export const newSubmit = (id,log,post,timeMultiplier) => {
    
    let config = {
		id: id,
		log_interval: log,
		data_post_api: post,
	};
    config.log_interval = config.log_interval * timeMultiplier;
    console.log("config to upsert: ", config);
    const options = {
        method: "POST",
        body: JSON.stringify(config),
        headers: { "Content-Type": "application/json" },
    };

    fetch(upsertConfig, options)
        .then((res) => res.json())
        .then((res) => console.log(res));
};


export const modifySubmit = (id,log,post,timeMultiplier) => {
    let config = {
		id: id,
		log_interval: log,
		data_post_api: post,
	};
    config.log_interval = config.log_interval * timeMultiplier;
    console.log(config);
    const options = {
        method: "POST",
        body: JSON.stringify(config),
        headers: { "Content-Type": "application/json" },
    };

    fetch(upsertConfig, options)
        .then((res) => res.json())
        .then((res) => console.log(res));
};