class Request {
    criarComLoad(titleLoad, titleSucesso, titleErro, rota, fetchOptions, callbackError) {
      let configsSwalSuccess = {
        icon: 'success',
        title: titleSucesso,
        onClose: () => {
        },
        allowOutsideClick: false
      };
      if (typeof titleSucesso === 'object') {
        configsSwalSuccess = titleSucesso;
      }
      Swal.fire({
        position: 'center',
        title: titleLoad,
        showConfirmButton: false,
        onBeforeOpen: () => {
          Swal.showLoading()
          //Request API
          fetch(rota,
            fetchOptions
          ).then(response => {
            if (!response.ok) {
              throw response
            }
            return response.json()
  
          }).then(data => {
            Swal.close();
            Swal.fire(configsSwalSuccess)
            
          }).catch(error => {
            Swal.close();
            function CriarMensagensDeError(arrayDeErros) {
              let mensagemErro = "";
              arrayDeErros.forEach(erro => {
                mensagemErro += erro + "<br>";
              });
              callbackError(arrayDeErros)
              return mensagemErro;
            }
            if (error == "TypeError: Failed to fetch") {
              Swal.fire({
                icon: 'error',
                title: titleErro,
                onClose: () => {
                  /// sdsdsdsd
                },
                allowOutsideClick: false
              })
            }
  
            console.log(error.status);          
            console.log(error.body)
            error.json().then(data => {
              console.log(data.Errors);
              Swal.fire({
                icon: 'error',
                title: CriarMensagensDeError(data.Errors),
                onClose: () => {
                  /// sdsdsdsd
                },
                allowOutsideClick: false
              })
            })
  
          })
        },
        allowOutsideClick: () => !Swal.isLoading()
      })
    }
  }