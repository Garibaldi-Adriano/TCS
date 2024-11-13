export class ErrorRequest{
    
    static errorRequest(code : string) : string {
        switch(code){
            case 'P2000':
                return 'ERROR: O valor fornecido para o campo é muito longo para o tipo de coluna.'
                break;
            case 'P2001':
                return 'ERROR: Nenhum registro encontrado para a consulta.'
                break;
            case 'P2002':
                return 'ERROR: Violação de restrição única; um registro com este valor já existe.'
                break;
            case 'P2003':
                return 'ERROR: Falha na restrição de chave estrangeira.'
                break;
            case 'P2004':
                return 'ERROR: Falha em uma restrição do banco de dados.'
                break;
            case 'P2005':
                return 'ERROR: Valor inválido fornecido para o campo.'
                break;
            case 'P2006':
                return 'ERROR: O valor fornecido não é válido para o tipo do campo.'
                break;
            case 'P2007':
                return 'ERROR: Erro de validação de dados.'
                break;
            case 'P2008':
                return 'ERROR: Falha ao analisar a consulta no banco de dados.'
                break;
            case 'P2009':
                return 'ERROR: Falha na validação da consulta.'
                break;
            case 'P2010':
                return 'ERROR: Falha na execução de uma consulta bruta (raw query).'
                break;
            default:
                return 'ERROR: no servidor.'
                break;
        }
    }
}