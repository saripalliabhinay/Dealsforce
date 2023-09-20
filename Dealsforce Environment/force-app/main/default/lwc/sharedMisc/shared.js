const si = (p,t,r)=>{
    if( p && t && r ){
        const cal = (p* t* r)/100;
        return cal;
    }
    return 0;
}

const add = (n1, n2)=>{return n1+n2;}


const sub=(a,b)=>{return a-b}


export { si, add , sub};