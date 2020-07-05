$(document).ready(function() {
  const USERNAME = "feed";
  const PASSWORD = "Aephe0Chiechei0dub5e";
  const REQUEST_UPDATE_MS = 60000;
  
  function Feeds() {
    this.config = {
      cs: 'https://api.cyber.bet/feeds/cs.json',
      d2: 'https://api.cyber.bet/feeds/d2.json',
      ow: 'https://api.cyber.bet/feeds/ow.json ',
      ll: 'https://api.cyber.bet/feeds/ll.json'
    }

    this.elements = {
      club1Name: $("#js-feeds-club1-name"),
      club1Logo: $("#js-feeds-club1-logo"),
      club1Odds: $("#js-feeds-club1-odds"),

      club2Name: $("#js-feeds-club2-name"),
      club2Logo: $("#js-feeds-club2-logo"),
      club2Odds: $("#js-feeds-club2-odds"),
    };

    this.getParams = () => {
      const { game, id } = getUrlParameter();
      const url = game && this.config[game.toLowerCase()];

      if(!url || !game) {
        console.log(`CYBERBET: game not found!`)
        return null
      };

      if(!id) {
        console.log(`CYBERBET: match id not found!`)
        return null
      };

      return {
        game,
        id,
        url,
      }
    }

    this.init = () => {
      const params = this.getParams();
      if (!params) return;
      this.getData(params.url, params.id);
    };

    this.checkWidget = () => {
      Object.keys(this.elements).map((key) => {
        if (!this.elements[key].length) console.error(`CYBERBET: ${key} not found!`);
      });
    };

    this.setContent = (match) => {
      const { club1, club2 } = match;

      const { club1Name, club1Logo, club1Odds, club2Name, club2Logo, club2Odds } = this.elements;
      const { outcomes } = match.market_line;

      if (club1Name) club1Name.text(club1.name);
      if (club1Logo) club1Logo.prop("src", club1.logo);
      if (club1Odds) club1Odds.text(outcomes[0].odds);

      if (club2Name) club2Name.text(club2.name);
      if (club2Logo) club2Logo.prop("src", club2.logo);
      if (club2Odds) club2Odds.text(outcomes[1].odds);
    }

    this.getData = (url, id) => {
      return $.ajax({
        method: "GET",
        url: url,
        dataType: 'json',
        xhrFields: {
          withCredentials: true
        },
        beforeSend: function (xhr) {
          xhr.setRequestHeader ("Authorization", "Basic " + btoa(USERNAME + ":" + PASSWORD));
        }
      }).done((res) => {
        if (res) {
          const match = res.matches[id];

          if(!match) {
            console.log('CYBERBET: Invalid match id provided')
            return;
          }

          this.setContent(match);

          setTimeout(() => {
            this.getData(url, id)
          }, REQUEST_UPDATE_MS);
        }

        if (res.errors) {
          console.log('CYBERBET: Request error', res.errors)
        }
      })
    }
  }

  const feeds = new Feeds();
  feeds.checkWidget();
  feeds.init();
});

const getUrlParameter = () => {
  const search = window.location.search.substring(1);
  const params = search.split('&');
  let result = {};

  params.forEach((pair) => {
    const res = pair.split('=');
    result[res[0]] = res[1] ? decodeURIComponent(res[1]) : undefined;
  });

  return result;
};