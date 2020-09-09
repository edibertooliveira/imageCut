
// TODO:  SELEÇÃO DA IMGAME PARA VISUALIZAÇÃO
let btnSeletorFoto = document.getElementById('btnSeletorDeFotos')
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
    reader.onload = function(event) {
      imagem.src = event.target.result;
    }


    //TODO: SELEÇÃO DA FERRAMENTA
    var startX, startY, relativeStartX, relativeStartY, endX, endY, relativeEndX, relativeEndY;

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

          //Resetar botao de corte
          btnCorteFoto.style.display = 'none';
        }
      
      },

      //Registrar posicionamentos finais de X e Y (Relativo) e Remover flag de inicio de seleção
      mouseup(){
        inicioSelecao = false

        relativeEndX = event.layerX;
        relativeEndY = event.layerY;

        //mostrar botao de corte
        btnCorteFoto.style.display = 'block';
      }
    }

    //Registrar eventos
    Object.keys(events)
    .forEach(e=>{
      recebeFoto.addEventListener(e, events[e]);
    });

    //TODO: HTML CANVAS API

    //Criar elemento canvas
    let canvas = document.createElement('canvas');

    //criar um contexto do elemnto
    let ctx = canvas.getContext('2d');

    //Atualizar o preview de imagem, agora, com o conteúdo do canvas ao inves da imagem
    imagem.onload = function() {
      const { width, height } = imagem;
      canvas.width = width;
      canvas.height = height;

      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(imagem, 0, 0);

      recebeFoto.src = canvas.toDataURL();
    }


    //TODO: CORTE IMAGEM
    // Adicionar evento click para quando clicar no botao
    btnCorteFoto.onclick = ()=>{
      
      // Calcular o corte proporcional ao tamanho da imagem na tela
      const { width: imgW, height: imgH } = imagem;
      const { width: rcbW, height: rcbH } = recebeFoto;

      //Divida a largura da foto pela largura do preview
      const [widthFator, heightFator] = [
        +(imgW / rcbW),
        +(imgH / rcbH)
      ]

      //Multiplicar a largura da seleção pelo fator de largura e o mesmo para a altura 
      const [ selecaoWidth, selecaoHeight] = [
        +seletorFerramenta.style.width.replace('px', ''),
        +seletorFerramenta.style.height.replace('px', '')
      ]

      const [ corteWidth, corteHeight ] = [
        +(selecaoWidth * widthFator),
        +(selecaoHeight * heightFator)
      ]

      //Calcule e guarde a posição x e y verdadeiras, para utilizar no ctx
      const [ atualX, atualY ] = [
        +( relativeStartX * widthFator ),
        +( relativeStartY * heightFator )
      ]

      // pegar o ctx a imagem cortada
      const imagemCortada = ctx.getImageData(atualX, atualY, corteWidth, corteHeight);

      // limpar o ctx
      ctx.clearRect(0, 0, ctx.width, ctx.height);

      // ajuste de proporcoes
      imagem.width = canvas.width = corteWidth;
      imagem.height = canvas.height = corteHeight;

      // adicionar a imagem cortada ao ctx
      ctx.putImageData(imagemCortada, 0, 0)

      // esconder ferramenta de corte
      seletorFerramenta.style.display = 'none';

      recebeFoto.src = canvas.toDataURL();

    }

  });
});



