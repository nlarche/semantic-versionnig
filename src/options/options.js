export default function getOptions(options){
        
     var result = [];   
     
     if (options) {
        if (typeof options === 'string') {
            
            result.push(options);
        
        } else if (typeof options === 'object') {
        
            result = Object.keys(options).map((key) => options[key]);
        }
    }
    return result;    
}