$(document).ready(function() {
  const $heart = $('.heart');
  const $message = $('.message');
  const $back = $('.back');
  const $checkbox = $('#messageState');
  let isAnimating = false;

  // Touch and mouse interaction handlers
  $heart.on('touchstart mouseenter', function(e) {
      e.preventDefault();
      if(isAnimating) return;
      requestAnimationFrame(() => {
          $heart.css('transform', 'translate3d(-50%, -50%, 0) scale(1.05)');
      });
  });

  $heart.on('touchend mouseleave', function(e) {
      e.preventDefault();
      if(isAnimating) return;
      requestAnimationFrame(() => {
          $heart.css('transform', 'translate3d(-50%, -50%, 0) scale(1)');
      });
  });

  // Unified click/touch handler
  $heart.on('touchstart click', function(e) {
      e.preventDefault();
      $checkbox.prop('checked', !$checkbox.prop('checked')).trigger('change');
  });

  // Checkbox change handler
  $checkbox.on('change', function() {
      toggleMessage(this.checked);
  });

  // Core animation controller
  function toggleMessage(open) {
      if(isAnimating) return;
      isAnimating = true;

      if(open) {
          requestAnimationFrame(() => {
              $heart.addClass('active');
              createRippleEffect(2, 100);
              
              setTimeout(() => {
                  $message.addClass('active');
                  $back.stop(true, true).fadeOut(400, () => {
                      isAnimating = false;
                  });
              }, 250);
          });
      } else {
          $message.removeClass('active');
          $heart.removeClass('active');
          $back.stop(true, true).fadeIn(400, () => {
              isAnimating = false;
          });
      }
  }

  // Ripple effect generator
  function createRippleEffect(count, delay) {
      const createRipple = () => {
          const ripple = $('<div class="ripple"></div>');
          $('.container').append(ripple);
          setTimeout(() => ripple.remove(), 1000);
      };

      for(let i = 0; i < count; i++) {
          setTimeout(createRipple, i * delay);
      }
  }
});