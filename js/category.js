
function toggleFilter(e) {
    _toggleFilter(e);
    renderFilterdItems();
    // doSearch(1);
}

function _toggleFilter(e) {
    var element = e;
    var group = element.getAttribute("data-group");
    var field = element.getAttribute("data-field");
    var text = element.getAttribute("data-text");
    var value = element.value;
    var operator = element.getAttribute("data-operator");
    var filterItemId = element.id;

    var isChecked = element.checked;


}

function renderFilterdItems() {
    var container = document.querySelector(".filter-container__selected-filter-list ul");
    container.innerHTML = "";

    var checkboxes = document.querySelectorAll(".filter-container input[type=checkbox]:checked");
    checkboxes.forEach(function(checkbox) {
        var id = checkbox.id;
        var name = checkbox.closest("label").textContent.trim();
        addFilteredItem(name, id);
    });

    var asideCheckboxes = document.querySelectorAll(".aside-content input[type=checkbox]:checked");
    if (asideCheckboxes.length > 0)
        document.querySelector(".filter-container__selected-filter").style.display = "block";
    else
        document.querySelector(".filter-container__selected-filter").style.display = "none";
}

function addFilteredItem(name, id) {
    var filteredItemTemplate = "<li class='filter-container__selected-filter-item' for='{3}'><a href='javascript:void(0)' onclick=\"removeFilteredItem('{0}')\"><i ><svg fill=\"#ffffff\" width=\"800px\" height=\"800px\" viewBox=\"0 0 32 32\" xmlns=\"http://www.w3.org/2000/svg\" stroke=\"#ffffff\">\n" +
        "\n" +
        "                                                <g id=\"SVGRepo_bgCarrier\" stroke-width=\"0\"/>\n" +
        "\n" +
        "                                                <g id=\"SVGRepo_tracerCarrier\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n" +
        "\n" +
        "                                                <g id=\"SVGRepo_iconCarrier\">\n" +
        "\n" +
        "                                                    <path d=\"M7.004 23.087l7.08-7.081-7.07-7.071L8.929 7.02l7.067 7.069L23.084 7l1.912 1.913-7.089 7.093 7.075 7.077-1.912 1.913-7.074-7.073L8.917 25z\"/>\n" +
        "\n" +
        "                                                </g>\n" +
        "\n" +
        "                                            </svg></i> {1}</a></li>";
    filteredItemTemplate = filteredItemTemplate.replace("{0}", id);
    filteredItemTemplate = filteredItemTemplate.replace("{1}", name);
    filteredItemTemplate = filteredItemTemplate.replace("{3}", id);
    var container = document.querySelector(".filter-container__selected-filter-list ul");
    container.insertAdjacentHTML('beforeend', filteredItemTemplate);
}

function removeFilteredItem(id) {
    var element = document.querySelector(".filter-container #" + id);
    if (element) {
        element.click();
    }
}

function filterItemInList(object) {
    var q = object.value.toLowerCase();
    q = q.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    object.parentElement.nextElementSibling.querySelectorAll('li').forEach(function(li) {
        var label = li.querySelector('label');
        if (label && label.getAttribute("data-filter").toLowerCase().indexOf(q) === -1) {
            li.style.display = "none";
        } else {
            li.style.display = "block";
        }
    });
}

function clearAllFiltered() {

    var container = document.querySelector(".filter-container__selected-filter-list ul");
    container.innerHTML = "";

    var checkboxes = document.querySelectorAll(".filter-container input[type=checkbox]");
    checkboxes.forEach(function(checkbox) {
        checkbox.checked = false;
    });

    document.querySelector(".filter-container__selected-filter").style.display = "none";

    // doSearch(1);
}

function sortby() {

}

// Xử lý sự kiện click cho .open-filters
document.querySelector('.open-filters').addEventListener('click', function(e) {
    e.stopPropagation();
    this.classList.toggle('openf');
    document.querySelector('.dqdt-sidebar').classList.toggle('openf');
    document.querySelector('.opacity_sidebar').classList.toggle('openf');
});

// Xử lý sự kiện click cho .opacity_sidebar
document.querySelector('.opacity_sidebar').addEventListener('click', function(e) {
    document.querySelector('.opacity_sidebar').classList.remove('openf');
    document.querySelector('.dqdt-sidebar').classList.remove('openf');
    document.querySelector('.open-filters').classList.remove('openf');
});