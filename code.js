const button = document.getElementById('generate-button');
const input = document.getElementById('md-input');
const output = document.getElementById('md-output');
const hashtagFilter = [];
const contentFilter = [];

const filters_button = document.getElementById('apply-filters-button');
const title_filtersElement = document.querySelector('input#filter-titles');
const hashtag_filtersElement = document.querySelector('input#filter-hashtags');

const clipboard_button = document.getElementById('output-to-clipboard');

button.addEventListener('click', main);

filters_button.addEventListener('click', applyFilters)

function applyFilters (e){
  const title_filters = title_filtersElement.value.split(",");
  const hashtag_filters = hashtag_filtersElement.value.split(",");

  for(const filter of hashtag_filters){
    hashtagFilter.push(filter.length);
  }

  for(const filter of title_filters){
    contentFilter.push(filter);
  }
}

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
    const currentTitleName = st.slice(1).join(' ');

    if(hashtagFilter.includes(currentNumOfHashtags)) continue;
    if(contentFilter.includes(currentTitleName)) continue;


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
    if(index.includes(`(#${id})`)){
      let finalNumber = index.match(new RegExp(`(#${id})`)).length.toString() - 1;
      id = `${id}-${finalNumber}`;
    }
    index = index + `${`  `.repeat(numOfTabs)}* [${str}](#${id})\n`;
  }
  
  output.value = index;
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