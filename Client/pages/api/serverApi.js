import axios from "axios";

const Api = axios.create({
  baseURL: "http://localhost:8000",
});

export const LoginApi = (data) => {
  try {
    return Api.post("/user-auth/", data);
  } catch (error) {
    console.log(error);
  }
};

export const RegisterApi = async (data) => {
  try {
    return await Api.post("/api/user/", data);
  } catch (error) {
    console.log(error);
  }
};

//------------------------------------------------

export const GetUserApi = async (userData, token) => {
  try {
    return await Api.get(`/api/user/${userData}/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const ChangeUserInfo = async (userId, userData, token) => {
  try {
    return await Api.patch(`/api/user/${userId}/`, userData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
export const ChangePasswordApi = async (password, token) => {
  try {
    return await Api.post(`/change-password/`, password, {
      headers: {
        Authorization: `token ${token}`,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

//-------------------------------------------------

export const GetCategoryApi = async () => {
  try {
    return await Api.get("/api/product-category/");
  } catch (error) {
    console.log(error);
  }
};

//-------------------------------------------------
export const GetAllProductApi = () => {
  try {
    return Api.get("/api/products/");
  } catch (error) {
    console.log(error);
  }
};

export const GetBookByCategory = (category_id) => {
  try {
    return Api.get(`/api/products/?category=${category_id}`);
  } catch (error) {
    console.log(error);
  }
};

export const GetBookBySearch = async (text) => {
  try {
    return await Api.get(`/api/products/?search=${text}`);
  } catch (error) {
    console.log(error);
  }
};

export const GetBookDetail = async (slug) => {
  try {
    return await Api.get(`/api/products/${slug}/`);
  } catch (error) {
    console.log(error);
  }
};

//------------------------------------------
export const GetBookReview = async (book_id) => {
  try {
    return await Api.get(`/api/review/?review=${book_id}`);
  } catch (error) {
    console.log(error);
  }
};

//------------------------------------------
export const SendCartToServer = (state, token) => {
  try {
    return Api.post("/api/order/", state, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

//------------------------------------------

export const CouponValidate = async (coupon, token) => {
  try {
    return await Api.get(`/api/coupon/${coupon}/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

//------------------------------------------

export const GetOrderUserCart = async (userId, token) => {
  try {
    return await Api.get(`/api/order/?user_id_paid=${userId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const GetOrderPendingCart = async (userId, token) => {
  try {
    return await Api.get(`/api/order/?user_id_pending=${userId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const OrderCart = async (order, token) => {
  try {
    return await Api.get(`/api/order/${order}/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const SendOrderCart = async (order, token) => {
  try {
    return await Api.post(`/api/order/`, order, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const PaymentSendApi = async (order, status, token) => {
  try {
    return await Api.patch(`/api/order/${order}/`, status, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

//==============================================

export const DeleteOrderApi = async (order_id, token) => {
  try {
    return await Api.delete(`/api/order/${order_id}/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
