$(document).ready(function() {
  $(".demo").select2({
    ajax: {
      url: "https://chroniclingamerica.loc.gov/search/titles/results/",
      dataType: "json",
      delay: 250,
      data: function (params) {
        return {
          terms: params.term,
          format: "json",
          page: params.page
        };
      },
      processResults: function (data, params) {
        params.page = params.page || 1;
        console.log(data.endIndex);
        return {
          results: data.items,
          pagination: {
            more: data.endIndex < data.totalItems
          }
        };
      },
      cache: true
    },
    minimumInputLength: 3,
    templateResult: formatNewspaper,
    templateSelection: formatNewspaperSelection
  });

  function formatNewspaper (newspaper) {
    if (newspaper.loading) {
      return newspaper.text;
    }
    var $container = $("<p>" + newspaper.title + "</p>");
    return $container
  }

  function formatNewspaperSelection (newspaper) {
    return newspaper.title || "Search for a newspaper";
  }
});
