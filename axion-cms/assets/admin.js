/**
 * Axion CMS – Admin JS
 * Handles: image uploader, repeater add/remove, success notice
 */
(function ($) {
    "use strict";

    $(document).ready(function () {
        // ── Success notice ──
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get("saved") === "1") {
            $(".axion-section-edit").prepend(
                '<div class="axion-notice">✅ Settings saved successfully!</div>'
            );
            // Clean URL
            const cleanUrl = window.location.href.replace("&saved=1", "");
            window.history.replaceState({}, "", cleanUrl);
        }

        // ── Image Upload ──
        $(document).on("click", ".axion-image-upload", function (e) {
            e.preventDefault();
            const target = $(this).data("target");
            const frame = wp.media({
                title: "Select Image",
                multiple: false,
                library: { type: "image" },
            });

            frame.on("select", function () {
                const attachment = frame.state().get("selection").first().toJSON();
                $("#" + target).val(attachment.id);
                const previewUrl = attachment.sizes?.thumbnail?.url || attachment.url;
                $("#" + target + "_preview")
                    .html('<img src="' + previewUrl + '" />')
                    .next(".axion-image-upload")
                    .after(
                        ' <button type="button" class="button axion-image-remove" data-target="' +
                        target +
                        '">Remove</button>'
                    );
            });

            frame.open();
        });

        // ── Image Remove ──
        $(document).on("click", ".axion-image-remove", function (e) {
            e.preventDefault();
            const target = $(this).data("target");
            $("#" + target).val("");
            $("#" + target + "_preview").html("");
            $(this).remove();
        });

        // ── Repeater: Add Row ──
        $(document).on("click", ".axion-repeater__add", function () {
            const name = $(this).data("name");
            const $repeater = $(this).closest(".axion-repeater");
            const $template = $repeater.find(
                '.axion-repeater__template[data-name="' + name + '"]'
            );
            const $rows = $repeater.find(".axion-repeater__rows");
            const newIndex = $rows.children().length;

            let html = $template.html();
            // Replace __INDEX__ with actual index
            html = html.replace(/__INDEX__/g, newIndex);

            $rows.append(html);
        });

        // ── Repeater: Remove Row ──
        $(document).on("click", ".axion-repeater__remove", function () {
            $(this).closest(".axion-repeater__row").fadeOut(200, function () {
                $(this).remove();
            });
        });

        // ── SEO Character Counter ──
        $(document).on("input keyup", ".axion-char-count", function () {
            var $input = $(this);
            var max = parseInt($input.data("max-chars"), 10);
            var len = $input.val().length;
            var $counter = $input.siblings(".axion-char-counter");
            if ($counter.length) {
                $counter.text(len + "/" + max + " characters");
                $counter.css("color", len > max ? "#dc2626" : "#666");
            }
        });
    });
})(jQuery);
