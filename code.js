const button = document.getElementById('generate-button');
const input = document.getElementById('md-input');
const output = document.getElementById('md-output');

const clipboard_button = document.getElementById('output-to-clipboard');

button.addEventListener('click', main)

function main(e){
  const text = input.value;

  const regex = /#+? .+/g;
  if(!regex.test(text)) return;

  const titles = text.match(regex);

  const titlesIndexables = titles.filter(title => !title.startsWith('# '));

  let index = ``;
  let numOfTabs = 0;
  let numOfHashtags = 2; /* don't change */

  for (const title of titlesIndexables) {
    const st = title.split(' ');
    const currentNumOfHashtags = st[0].length;

    

    if(currentNumOfHashtags > numOfHashtags){
      numOfTabs++
    }else if(currentNumOfHashtags === numOfHashtags - 1){
      numOfTabs--
    }else if(currentNumOfHashtags != numOfHashtags){
      numOfTabs = currentNumOfHashtags - 2;
    }

    numOfHashtags = currentNumOfHashtags;

    const str = st.join(' ').slice(currentNumOfHashtags+1); /* slice(currentNumOfHashtags+1) remove the '#(...) ' */
    let id = str.toLowerCase().replaceAll(/[^\w\s-áéúíóÑñ]/g,"").split(" ").join("-");
    if(index.includes(id)){
      let finalNumber = index.match(new RegExp(id)).length.toString();
      id = `${id}-${finalNumber}`;
    }
    index = index + `${`  `.repeat(numOfTabs)}* [${str}](#${id})\n`;
  }
  
  output.value = index
}

clipboard_button.addEventListener('click', outputToClipboard);

function outputToClipboard(e){
  navigator.clipboard.writeText(output.value);
  const output_area = document.getElementById('output-area');
  const notification = document.createElement('div');
  notification.innerText = 'Copiado al portapapeles';
  notification.classList.add('notification');
  notification.id = 'notification'
  output_area.appendChild(notification);
  setTimeout(() => {
    output_area.removeChild(document.getElementById('notification'));
  },2000);
}