import {Pipe, PipeTransform } from "@angular/core";


@Pipe({
    name: 'search'
})

export class FilterPipe implements PipeTransform{
transform(value:any, filterTxt:any) {
    
    if (!Array.isArray(value)) {
        return value; // Return value as is if it's not an array
    }
if(!value) return null;
if(!filterTxt) return value;
filterTxt = filterTxt.toLowerCase();

return value.filter((item:any) => {
    return JSON.stringify(item).toLowerCase().includes(filterTxt)
})
}
}