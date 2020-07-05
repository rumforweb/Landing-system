var search = location.search
  .substr(1)
  .split("&")
  .reduce(function(res, a) {
    var t = a.split("=");

    if (!!t[1]) res[decodeURIComponent(t[0])] = t.length == 1 ? null : decodeURIComponent(t[1]);
    return res;
  }, {});

document.addEventListener("DOMContentLoaded", () => {
  if (Cookies.get(config.ALREADY_REGISTER)) window.location.href = config.BASE_URL;

  var login = document.getElementById("login");
  login.setAttribute("href", config.BASE_URL + "#login");

  var privacy = document.getElementById("privacy");
  privacy.setAttribute("href", config.PRIVACY_URL);

  var terms = document.getElementById("terms");
  terms.setAttribute("href", config.TERMS_URL);

  const isValidElement = element => {
    return element.name && element.value;
  };

  const isValidValue = element => {
    return !["checkbox", "radio"].includes(element.type) || element.checked;
  };

  const isCheckbox = element => element.type === "checkbox";

  const formToJSON = elements =>
    [].reduce.call(
      elements,
      (data, element) => {
        data = { ...data, search };

        if (isValidElement(element) && isValidValue(element)) {
          if (isCheckbox(element)) {
            data[element.name] = (data[element.name] || []).concat(element.value);
          } else {
            data[element.name] = element.value;
          }
        }

        return data;
      },
      {}
    );

  const handleFormSubmit = async event => {
    event.preventDefault();

    const data = formToJSON(form.elements);

    var email = data.email;
    var password = data.password;
    var currency = data.currency;
    var affiliate = data.search;

    try {
      const response = await fetch(config.API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          query: `mutation
                userRegistrationSimple($password: String!, $email: String!, $currency: Currency!, $affiliate: MapString){
                    userRegistrationSimple(input: {
                      password: $password,
                      email: $email,
                      currency: $currency,
                      affiliate: $affiliate
                    }) {
                      loginToken
                      accessToken
                      refreshToken
                    }
                }`,
          variables: {
            email,
            password,
            currency,
            affiliate
          }
        })
      });

      const resJson = await response.json();

      if (resJson.data) {
        Cookies.set(config.ALREADY_REGISTER, "register", { expires: 365, domain: "cyberbet.bet" });

        window.location.href = `${config.BASE_URL}?loginToken=${resJson.data.userRegistrationSimple.loginToken}`;
      }
    } catch (e) {
      console.log(e);
    }
  };

  const form = document.forms["myForm"];
  form.addEventListener("submit", handleFormSubmit);
});
