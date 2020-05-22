(function(){
    
  // Inicia o firebase Firebase
  var config = {
    apiKey: "AIzaSyBNAFkLQAwM3qF1B7LU9z_ja9zL2UIR-5s",
    authDomain: "projeto-sistemas-digitai-ec00c.firebaseapp.com",
    databaseURL: "https://projeto-sistemas-digitai-ec00c.firebaseio.com",
    storageBucket: "projeto-sistemas-digitai-ec00c.appspot.com",
    messagingSenderId: "788397899247"
  };
  firebase.initializeApp(config);

  var db = firebase.database();

  // Cria os listeners dos dados no firebase
  var tempRef = db.ref('sala/temperatura');
  var umidRef = db.ref('sala/umidade');
  var lumRef = db.ref('sala/luminosidade');
  
  //var presenceRef = db.ref('presence');
  var lampRef = db.ref('sala/set_luminosidade');
  var setArRef = db.ref('sala/set_ar');
  var setMultimidiaRef = db.ref('sala/set_multimidia');
  var setPortaRef = db.ref('sala/set_porta');


  // Registra as funções que atualizam os gráficos e dados atuais da telemetria
  tempRef.on('value', onNewData('currentTemp', 'C°'));
  umidRef.on('value', onNewData('currentUmid', '%'));
  lumRef.on('value', onNewData('currentLum', ''));

  // Registrar função ao alterar valor de presença
 /* presenceRef.on('value', function(snapshot){
    var value = snapshot.val();
    var el = document.getElementById('currentPresence')
    if(value){
      el.classList.add('green-text');
    }else{
      el.classList.remove('green-text');
    }
  });*/

  // Registrar função ao alterar valor da lampada
  var currentLampValue = false;
  lampRef.on('value', function(snapshot){
    var value = snapshot.val();
    var el = document.getElementById('currentLamp')
    if(value){
      el.classList.add('amber-text');
    }else{
      el.classList.remove('amber-text');
    }
    currentLampValue = !!value;
  });

  // Registrar função de click no botão de lampada
  var btnLamp = document.getElementById('btn-lamp');
  btnLamp.addEventListener('click', function(evt){
    lampRef.set(!currentLampValue);
  });

  var currentAr = false;
  setArRef.on('value', function(snapshot){
    var value = snapshot.val();
    var el = document.getElementById('currentAr')
    if(value){
      el.classList.add('amber-text');
    }else{
      el.classList.remove('amber-text');
    }
    currentAr = !!value;
  });

  // Registrar função de click no botão de lampada
  var btnAr = document.getElementById('btn-ar');
  btnAr.addEventListener('click', function(evt){
    setArRef.set(!currentAr);
  });

  var currentMultimidia = false;
  setMultimidiaRef.on('value', function(snapshot){
    var value = snapshot.val();
    var el = document.getElementById('currentMultimidia')
    if(value){
      el.classList.add('amber-text');
    }else{
      el.classList.remove('amber-text');
    }
    currentMultimidia = !!value;
  });

  // Registrar função de click no botão de lampada
  var btnMultimiidia = document.getElementById('btn-multimidia');
  btnMultimiidia.addEventListener('click', function(evt){
    setMultimidiaRef.set(!currentMultimidia);
  });

  var currentPorta = false;
  setPortaRef.on('value', function(snapshot){
    var value = snapshot.val();
    var el = document.getElementById('currentPorta')
    if(value){
      el.classList.add('amber-text');
    }else{
      el.classList.remove('amber-text');
    }
    currentPorta = !!value;
  });

  // Registrar função de click no botão de lampada
  var btnPorta = document.getElementById('btn-porta');
  btnPorta.addEventListener('click', function(evt){
    setPortaRef.set(!currentPorta);
  });

  

})();


// Retorna uma função que de acordo com as mudanças dos dados
// Atualiza o valor atual do elemento, com a metrica passada (currentValueEl e metric)
// e monta o gráfico com os dados e descrição do tipo de dados (chartEl, label)
function onNewData(currentValueEl, metric){
  return function(snapshot){
    var readings = snapshot.val();
    if(readings){
        var currentValue;
        var data = [];
        for(var key in readings){
          currentValue = readings[key]
          data.push(currentValue);
        } 
        document.getElementById(currentValueEl).innerText = readings + ' ' + metric;
    }
  }
}