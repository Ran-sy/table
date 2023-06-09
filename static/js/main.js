
const events = () => {
    $(document).on("click", function(){
        $('.dropdown').removeClass('open')
    })
    $(document).on("click", ".checkbox", function(e){
        const toggleBox = (_) =>{
            if($(_).hasClass('active')){
                $(_).removeClass('active');
                $(`#${naming}`).removeClass('active')
            }else{
                $(_).addClass('active')
            }
        }
        const toggleAllBoxes = (_, isActive=false) => {
            $(this).toggleClass('active');
            Array.from(Object.values(_)).forEach((el)=> {
                isActive? $(el).removeClass('active'): $(el).addClass('active')
            })
        }

        const cName = $(this).attr('name')||$(this).attr('id');
        if(!$(this).attr('name'))
            toggleAllBoxes($(`[name=${cName}]`), $(this).hasClass('active'))
        else toggleBox($(this))
        
    })
    $(document).on("click", ".dropdown", function(e){
        $('.dropdown').removeClass('open')
        const options = $(e.target).parents('.dropdownOptions')[0];
        if(options){
            const text = $(e.target).parent('li')[0] ? $(e.target).parent('li').children('.option').text() : $(e.target).children('.option').text();
            if($(this).find('.text')[0]) $(this).find('.text').text(text)
        }
        $(this).toggleClass('open'); 
        e.stopPropagation();
    })
    
    $('.navbar').each(function(){
        $('<nav class="full-width flex flex-start"><div class="dropdown"><div class="icon public bgDark material-icons">notes</div><div class="dropdownOptions"><li><i class="material-icons icon public">checklist</i> TODO</li></div></div></nav>').appendTo($(this))
    })
    $('table.paginated').each(function() {
        var currentPage = 0;
        var numPerPage = $(this).data('size') || 10;
        var $table = $(this);
        $table.bind('repaginate', function() {
            $table.find('tbody tr').hide().slice(currentPage * numPerPage, (currentPage + 1) * numPerPage).show();
            $('.table-wrapper').find('.page-number').addClass('hide')
            $('.table-wrapper').find(`.page-number:nth-child(${currentPage+1})`).removeClass('hide');
        });
        $table.trigger('repaginate');
        var numRows = $table.find('tbody tr').length;
        var numPages = Math.ceil(numRows / numPerPage);
        var $pager = $('<div class="pager"></div>');
        for (var page = 0; page < numPages; page++) {
            $(`<p class="page-number">${page*numPerPage+1}-${(1+page)*numPerPage} of ${numRows}</p>`).appendTo($pager).addClass('hide');
        }
        $('<span id="back" class="icon public bgDark radius0 rotate180 material-icons" disabled>arrow_forward_ios</span>').bind('click', function(){
            console.log(currentPage)
            if(currentPage != 0) currentPage--;
            $table.trigger('repaginate');
        }).appendTo($pager);
        $('<span id="forward" class="icon public bgDark radius0 material-icons">arrow_forward_ios</span>').bind('click', function(){
            console.log(currentPage)
            if(numPages != currentPage+1) currentPage++;
            $table.trigger('repaginate');
        }).appendTo($pager);
            
        
        $('.table-wrapper').prepend($pager).find('.page-number:first').removeClass('hide');

        $('td.checkbox').each(function(){
            const title = $(this).data('title') || 'title';
            const desc = $(this).data('description') || 'description';
            $(`<div class="checkmark"></div><div><h5 class="cHover">${title}</h5> <p class="desc">${desc}</p></div>`).appendTo($(this))
        })
        $('td.btns').each(function(){
            const number = parseInt($(this).data('number')) || 1;
            const colors = Array.from(Object.values($(this).data('colors'))) || '';
            const names = Array.from(Object.values($(this).data('names'))) || '';
            let button =[];
            for(let i=0; i<number; i++)
            button[i]=`<div class="button small ${colors[i]}"> ${names[i]}</div>`
            $(`<div class="flex">${button.join(' ')}</div>`).appendTo($(this))
        })
        $('td.date').each(function(){
            date = $(this).data('date')? $(this).data('date'):'Aug, 07 2020';
            $(`<p class='c0 one-line'>${date}</p>`).appendTo($(this))
        })
        $('td.profileImg').each(function(){
            imgUrl =$(this).data('url')? `<img class='avatar small' src=${$(this).data('url')} />` : 'JS';
            $(`<div class="avatar small">${imgUrl}</div>`).appendTo($(this))
        })
        $('td.menu').each(function(){
            $('<div class="dropdown"><i class="icon public material-icons">unfold_more_double</i><div class="dropdownOptions small"><a href="" class="li"><i class="icon public material-icons">edit</i>Edit</a><a href="" class="li"><i class="icon public material-icons">delete</i>delete</a><a href="" class="li"><i class="icon public material-icons">star</i>Important</a></div></div>').appendTo($(this))
        })
    });
}

$(document).ready(()=>{
    events();
})
