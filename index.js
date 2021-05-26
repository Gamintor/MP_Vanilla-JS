const $ = document.querySelectorAll.bind(document);

let txtArea = $('textarea')[0];

const mrk = new Request('sample.md');
fetch(mrk)
    .then(data => data.text())
    .then(text => {
        txtArea.innerHTML = text;
        $('.prev-text')[0].innerHTML = marked(text, {renderer: renderer})
        Prism.highlightAll();
        
    });

marked.setOptions({
    breaks: true
});

let renderer = new marked.Renderer();
renderer.link = function(href, title, text) {
    return `<a target="_blank" href="${href}">${text}` + `</a>`
}

renderer.code = function(code, infostring, escaped) {
    return `<pre><code class="language-javascript">${code}` + `</code></pre>\n`;
}

renderer.codespan = function(code) {
    return `<code class="language-javascript">${code}` + `</code>`;
}

txtArea.addEventListener('input', event => {
    $('.prev-text')[0].innerHTML = marked(event.target.value, {renderer: renderer});
});

$('#edit-icon')[0].addEventListener('click', function() {
        if($('.editor')[0].classList.contains('maximized')) {
            $('.editor')[0].classList.remove('maximized');
            $('.preview')[0].classList.remove('hide');
            $('body')[0].classList.remove('body_max');
        } else {
            $('.editor')[0].classList.add('maximized');
            $('body')[0].classList.add('body_max');
            $('.preview')[0].classList.add('hide');
        }
});

$('#prev-icon')[0].addEventListener('click', function() {
        if($('.preview')[0].classList.contains('maxi_prev')) {
            $('.preview')[0].classList.remove('maxi_prev');
            $('.editor')[0].classList.remove('hide');
        } else {
            $('.preview')[0].classList.add('maxi_prev');
            $('.editor')[0].classList.add('hide');
        }
});