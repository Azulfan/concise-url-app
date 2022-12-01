const accordion = document.querySelectorAll('.accordion');
const accLength = accordion.length;

const Myfunction = function () {
  this.classList.toggle('active');
  let panel = this.nextElementSibling;
  if (panel.style.maxHeight) {
    panel.style.maxHeight = null;
  } else {
    panel.style.maxHeight = panel.scrollHeight + 'px';
  }
};

for (let i = 0; i < accLength; i++) {
  accordion[i].addEventListener('click', Myfunction);
}

//Button Copy Actiom
const btnCopy = document.querySelectorAll('#copyUrl');
const txtCopy = document.querySelectorAll('#shortUrl');
const toolTip = document.querySelectorAll('#myTooltip');

for (let i = 0; i < btnCopy.length; i++) {
  btnCopy[i].addEventListener('click', function () {
    const r = document.createRange();
    r.selectNode(txtCopy[i]);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(r);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();

    toolTip[i].innerHTML = 'Copied';
  });
}

//Alert Massage Login
const btnClose = document.querySelector('.close');
const alertElement = document.querySelector('.alert');
btnClose.addEventListener('click', function () {
  alertElement.classList.add('close');
});

function outFunc() {
  for (let i = 0; i < toolTip.length; i++) {
    toolTip[i].innerHTML = 'Copy';
  }
}
