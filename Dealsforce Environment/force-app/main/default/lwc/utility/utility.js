const si2 = (p,t,r)=>{
    if( p && t && r ){
        const cal = (p* t* r)/100;
        return cal;
    }
    return 0;
}

const add = (n1, n2)=>{return n1+n2;}

export { si2, add};