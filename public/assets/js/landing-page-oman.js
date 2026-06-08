(function(){
  document.addEventListener('DOMContentLoaded', function(){
    document.querySelectorAll('.lpo-faq-wrap').forEach(function(wrap){
      function setState(item, isOpen){
        var answer = item.querySelector('.lpo-faq-answer');
        var btn = item.querySelector('.lpo-faq-question');
        item.classList.toggle('is-open', isOpen);
        if (btn) btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        if (answer) answer.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
      }
      wrap.querySelectorAll('.lpo-faq-item').forEach(function(item){
        setState(item, item.classList.contains('is-open'));
      });
      wrap.querySelectorAll('.lpo-faq-question').forEach(function(btn){
        btn.addEventListener('click', function(){
          var item = btn.closest('.lpo-faq-item');
          if (!item) return;
          var willOpen = !item.classList.contains('is-open');
          wrap.querySelectorAll('.lpo-faq-item.is-open').forEach(function(open){
            if (open !== item) setState(open, false);
          });
          setState(item, willOpen);
        });
      });
    });
  });
})();
