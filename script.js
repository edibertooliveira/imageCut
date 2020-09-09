
// TODO:  SELEÇÃO DA IMGAME PARA VISUALIZAÇÃO
let btnSeletorFoto = document.getElementById('seletorDeFotos')
let btnBaixar = document.getElementById('btnBaixar');
let btnCorteFoto = document.getElementById('btnCorteFoto');

let arquivoDaFoto = document.getElementById('arquivoDaFoto');
let recebeFoto = document.getElementById('recebeFoto');


let imagem = new Image();


//Adicionar evento 'click' no elemento #seletorDeFotos, que irá executar a funcionalidade de clicar no elemento #arquivoDaFoto
btnSeletorFoto.onclick = () => {
  arquivoDaFoto.click();
};

//Ao terminar o evento de carregar a DOM
window.addEventListener('DOMContentLoaded', ()=>{

//Adicionar evento 'change' no elemento #arquivoDaFoto

  arquivoDaFoto.addEventListener('change', e => {
    
    //Criar um novo FileReader()
    const reader = new FileReader();
    const file = arquivoDaFoto.files.item(0);

    //Usar a funcionalidade .readAsDataURL() para a leitura do arquivo
    reader.readAsDataURL(file);

     //Adicionar ao src do elemento #imagem
    reader.onload = ()=> {
      recebeFoto.src = reader.result;
    }


    //TODO: SELEÇÃO DA FERRAMENTA
    let startX, startY, relativeStartX, relativeStartY, endX, endY, relativeEndX, relativeEndY;

    let inicioSelecao = false;
    let seletorFerramenta = document.getElementById('seletorFerramenta');

    //Criar eventos do mouse
    const events = {
      mouseover(){
        //transforme cursor do mause em cruz
        this.style.cursor = 'crosshair';
      },
      //Registrar posicionamentos iniciais de x e y(absolutos e relativos)
      mousedown(){
        
        const {clientX, clientY, offsetX, offsetY} = event;
        startX = clientX;
        startY = clientY;
        relativeStartX = offsetX;
        relativeStartY = offsetY;
        inicioSelecao = true;

      },
      //Registrar posicionamentos finais de X e Y e atualizar estilos visuais da seleção
      mousemove(){

        if(inicioSelecao) {
          endX  = event.clientX;
          endY = event.clientY;
      
          seletorFerramenta.style.display = 'initial';
          seletorFerramenta.style.top = startY + 'px';
          seletorFerramenta.style.left = startX + 'px';
      
          seletorFerramenta.style.width = (endX - startX) + 'px';
          seletorFerramenta.style.height = (endY - startY) + 'px';

          btnCorteFoto.style.display = 'none';
        }
      
      },

      //Registrar posicionamentos finais de X e Y (Relativo) e Remover flag de inicio de seleção
      mouseup(){
        relativeEndX = event.layerX;
        relativoEndY = event.layerY;


        inicioSelecao = false
        btnCorteFoto.style.display = 'block';
      }
    }

    //Registrar eventos
    Object.keys(events)
    .forEach(e=>{
      recebeFoto.addEventListener(e, events[e]);
    })

    //TODO: HTML CANVAS API

    //Criar elemento canvas
    let canvas = document.createElement('canvas');

    //criar um contexto do elemnto
    let ctx = canvas = canvas.getContext('2d');

    //Atualizar o preview de imagem, agora, com o conteúdo do canvas ao inves da imagem
    imagem.onload = function() {
      const { width, height } = imagem;
      canvas.width = width;
      canvas.height = height;

      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(imagem, 0, 0);

      recebeFoto.src = canvas.toDataURL();
    }


  })
})



