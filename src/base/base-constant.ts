export enum TABLE_NAME {
  // Area
  PROVINCE = "province",
  DISTRICT = "district",
  SUB_DISTRICT = "sub_district",
  VILLAGE = "village",
  // ====
  CONFIG_SYSTEM = "config_system",
  USER = "user",
  USER_CATEGORY = "user_category",
  PRODUCT = "product",
  STOCK = "stock",
  STOCK_CARD = "stock_card",
  STOCK_FIFO = "stock_fifo",
  TP_PRODUCT_CODE = "tp_product_code",
  PRODUCT_CATEGORY = "product_category",
  PRODUCT_TYPE = "product_type",
  UOM = "uom",
  WAREHOUSE = "warehouse",
  SUPPLIER = "supplier",
  CUSTOMER = "customer",
  // Transaction
  PURCHASE = "purchase",
  PURCHASE_DETAIL = "purchase_detail",
  SALE = "sale",
  SALE_DETAIL = "sale_detail",
}

export enum MODULE_NAME {
  AREA = "area",
  CONFIG_SYSTEM = "config-system",
  USER = "user",
  USER_CATEGORY = "user-category",
  PRODUCT = "product",
  PRODUCT_CATEGORY = "product-category",
  PRODUCT_TYPE = "product-type",
  UOM = "uom",
  WAREHOUSE = "warehouse",
  SUPPLIER = "supplier",
  CUSTOMER = "customer",
  // Transaction
  PURCHASE = "purchase",
  SALE = "sale",
}

export enum RESPONSE_STATUS {
  SUCCESS = "success",
  FAILED = "failed",
}

export enum LOCATION_ITEM {
  KITCHEN = "kitchen",
  PANTRY = "pantry",
}

export enum STOCK_CHANGE_CATEGORY {
  PURCHASE = "purchase",
  SALE = "sale",
}