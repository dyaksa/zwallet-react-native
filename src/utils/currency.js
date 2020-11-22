const formatCurrency = (num) => {
    if(typeof(num) != "number"){
        return parseInt(num).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    }else{
        return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    }
}

export {
    formatCurrency
}