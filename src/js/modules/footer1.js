define(['jquery'],()=>{
    class Footer{
        constructor(){
            this.render()
        }
        render(){
            $.get('/html/modules/footer.html',(resp)=>{
                $('footer').html(resp)
            })
        }
    }
    return new Footer() 
})