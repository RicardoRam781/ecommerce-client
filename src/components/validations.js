function onBlurPass () {
    const nombre = form.fullName
    const nickName = form.nickname
    const email = form.email
    
    function validateUsername(validatename){
      const usernameRegex = /^[a-zA-ZÁÉÍÓÚáéíóúñÑ\s]+$/;
      return usernameRegex.test(validatename);
    }
    
    function ValidateInputNames(inputName){ 
    if(validateUsername(inputName) === true && inputName.length > 5){
      //console.log("Nombre valido",inputName)
      const cleanedFullName = inputName.replace(/\s+/g, ' ').trim(); // Reemplazar múltiples espacios por uno solo
      console.log("Nombre limpio",cleanedFullName);
    }else{
      console.log("El nombre no puede contener caracteres especiales, coloca tu nombre ej: Juan Pérez");
    } }
    ValidateInputNames(nombre);
    ValidateInputNames(nickName);

    function validatePassword(psw,confpsw){

      const regxx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,20}$/
       
      if (psw !== confpsw){
        setAlert(true)
        setMsj("las contraseñas no coinciden")
        console.log("las contraseñas no coinciden",psw , confpsw);
      }
      if (!psw.match(regxx)) {
        setAlert(true)
        setMsj("La contraseña debe contener el siguiente formato: caracteres especiales, longitud entre 8 y 15, sin espacios, minimo una mayuscula y una minuscula")
        if(psw.length ===0 ){
          setAlert(false)
        }
        else if (psw.length < 8 || psw.length > 20){
          settype("Longitud")
        }
      }
    
    }
    validatePassword(form.password,pass.confPass);

    function validateEmail(email){
      const regux = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/  ;
      const validate = regux.test(email)
      if(validate === true){
        console.log("Correo valido")

      }else {
        console.log("Correo invalido")
        setAlert(true)
        setMsj("Correo invalido")
      }
    }
    validateEmail(email);
  }
 