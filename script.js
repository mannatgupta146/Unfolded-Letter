$(document).ready(function() {
  const $heart = $('.heart');
  const $message = $('.message');
  const $back = $('.back');
  const $checkbox = $('#messageState');

  // Smooth toggle animation
  function toggleMessage(open) {
      if(open) {
          // Open animation sequence
          $heart.addClass('active');
          
          // Create multiple ripples
          createRippleEffect(3, 150);
          
          setTimeout(() => {
              $message.addClass('active');
              $back.fadeOut(600);
          }, 300);
          
          // Add subtle paper sound effect
          const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3');
          audio.volume = 0.3;
          audio.play();
      } else {
          // Close animation
          $message.removeClass('active');
          $heart.removeClass('active');
          $back.fadeIn(600);
      }
  }

  // Checkbox handler
  $checkbox.on('change', function() {
      toggleMessage(this.checked);
  });

  // Ripple effect creator
  function createRippleEffect(count, delay) {
      for(let i = 0; i < count; i++) {
          setTimeout(() => {
              const ripple = $('<div class="ripple"></div>');
              $('.container').append(ripple);
              ripple.css({
                  left: '50%',
                  top: '40%'
              });
          }, i * delay);
      }
  }

  // Heart hover effect
  $heart.hover(
      () => $heart.css('transform', 'translate(-50%, -50%) scale(1.05)'),
      () => $heart.css('transform', 'translate(-50%, -50%) scale(1)')
  );
});