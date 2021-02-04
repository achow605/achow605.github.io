const container = document.querySelector('main');
const image = document.querySelector('#me');
const walk = 100;

function shadow(e) {
  const {
    offsetWidth: width,
    offsetHeight: height
  } = container;
  let {
    offsetX: x,
    offsetY: y
  } = e;

  if (this !== e.target) {
    x += e.target.offsetLeft;
    y += e.target.offsetTop;
  }

  const xWalk = Math.round((x / width * walk) - (walk / 2));
  const yWalk = Math.round((y / height * walk) - (walk / 2));

  image.style.boxShadow = `${yWalk}px ${xWalk * -1}px 0 rgba(48, 48, 48, 0.8),
  ${xWalk * -1}px ${yWalk}px 0 rgba(96, 150, 236, 0.8)`;

  image.style.transform = `translate(${xWalk * 0.1}px, ${yWalk * 0.1}px)`;
}

document.addEventListener('mousemove', shadow);
