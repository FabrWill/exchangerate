import { HttpException, HttpStatus } from "@nestjs/common";

export class ExchangeApiErrorHandler {
  static errorMessages = {
    "unsupported-code": "Código de moeda não suportado.",
    "malformed-request": "Requisição malformada.",
    "invalid-key": "Chave da API inválida.",
    "inactive-account": "Conta inativa.",
    "quota-reached": "Cota atingida.",
  };

  static handleError(error) {
    if (error.response?.data?.result === "error") {
      const errorType = error.response.data["error-type"];
      const errorMessage = this.errorMessages[errorType] || "Erro desconhecido na API de câmbio.";
      throw new Error(errorMessage);
    }

    throw new HttpException("Ocorreu um erro desconhecido em nossa API tente novamente mais tarde", HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
