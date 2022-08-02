class Validacoes {
  static autenticacaoCPF(cpf) {
    const strg = cpf.toString();
    const replace = strg.replace(/\D/g, "");
    let splitCPF = replace.split("");
    if (splitCPF.length < 11) {
      throw new Error("Cpf inválido!");
    } else {
      let dez = 10;
      let onze = 11;
      let arrVeriricaDigitoUm = [];
      let arrVeriricaDigitoDois = [];

      const verificacaoPrimeiroDigito = Validacoes.multiplicaEDivide(
        dez,
        arrVeriricaDigitoUm,
        splitCPF
      );
      const verificacaoSegundoDigito = Validacoes.multiplicaEDivide(
        onze,
        arrVeriricaDigitoDois,
        splitCPF
      );

      if (
        verificacaoPrimeiroDigito === splitCPF[9] &&
        verificacaoSegundoDigito === splitCPF[10]
      ) {
        return replace;
      } else {
        throw new Error(
          `Os dígitos retornados são ${primeiraAutenticacao}${segundaAutenticacao}. o CPF é inválido!`
        );
      }
    }
  }
  static autenticacaoNome(nome) {
    if (nome.length < 8) {
      throw new error("Campo nome deve ter ao menos 8 caracteres!");
    } else {
      return nome.toUpperCase();
    }
  }
  static autenticacaoTelefone(telefone) {
    if (telefone.length < 11) {
      throw new Error("Campo telefone deve contar ao menos 11 digitos!");
    } else {
      return telefone;
    }
  }

  static autenticacaoEmail(email) {
    const mail = /\S+@\S+\.\S+/;
    mail.test(email);
    return email;
  }
  static autenticacaoSenha(senha) {
    let retorno = false;
    const letrasMaiusculas = /[A-Z]/;
    const letrasMinisculas = /[a-z]/;

    const caracteresEspeciais = /[!|@|#|$|%|^|&|*|(|)|-|_]/;
    if (senha.length < 8) {
      return retorno;
    } else {
      let auxMa = 0;
      let auxMin = 0;

      let auxCEspeciais = 0;
      for (let i = 0; i < senha.length; i++) {
        if (letrasMaiusculas.test(senha[i])) {
          auxMa++;
        } else if (letrasMinisculas.test(senha[i])) {
          auxMin++;
        } else if (caracteresEspeciais.test(senha[i])) {
          auxCEspeciais++;
        }
      }

      if (auxMa > 0) {
        if (auxMin > 0) {
          if (auxCEspeciais > 0) {
            retorno = true;
          }
        }
      }
      return senha;
    }
  }
  static multiplicaEDivide(num, arrVerificador, splitCpf) {
    const valuefNum = num.valueOf();
    for (let i = 0; i < valuefNum; i++)
      if (num < 2) {
        break;
      } else {
        arrVerificador.push(splitCpf[i] * num--);
      }

    const soma = arrVerificador.reduce((total, vAtual) => total + vAtual);
    const multiplicaDezERestOnze = ((soma * 10) % 11).toString();
    multiplicaDezERestOnze === 10 || 11 ? 0 : multiplicaDezERestOnze;
    return multiplicaDezERestOnze;
  }
}

export default Validacoes;
