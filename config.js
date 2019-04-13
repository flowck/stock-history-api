module.exports = {
  test: {
    SERVER_NAME: "localhost",
    DB_NAME: "stockHistoryService_test",
    DATASET: `${__dirname}/test/dataset`
  },
  dev: {
    SERVER_NAME: "localhost",
    DB_NAME: "stockHistoryService",
    DATASET: "/home/nextbss/Documentos/x/node/amex-nyse-nasdaq-stock-histories/fh_20190301/500mb-dataset"
  },
  production: {
    SERVER_NAME: "localhost",
    DB_NAME: "stockHistoryService",
    DATASET: "../test/dataset"
  }
}