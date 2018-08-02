<div class="alert hidden-alert" id="alertBox">
    <div class="inner">
        <div data-content-block="alertCopy" data-content="content" data-editable="editable" class="alert-body">
          {{#page.alertCopy}}
            {{& content}}
          {{/page.alertCopy}}
            <h2>Alert</h2>
            <p>We will be closed on Monday, May 30th, in observance of Memorial Day and will reopen Tuesday, May 31st.</p>
        </div>
        <button class="close"><span class="sr-only">Close Alert</span>&times;</button>
    </div>
</div>