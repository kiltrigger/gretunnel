function tgDisplayPartnerBanner(tgpartner_bannersize, tgpartner_id, tgpartner_unique)
{
    var tgpartner_dimensions = tgpartner_bannersize.split('_');    
    if (!tgpartner_dimensions.length) {
        return false;
    }

    var tgpartner_url = 'http://tg.tomsk.ru/';
    var flashvars = {'target_url': tgpartner_url + '?a=' + tgpartner_id};
    var params = {'allowscriptaccess': 'sameDomain',
                  'allowfullscreen': true,
                  'wmode': 'transparent'};
    swfobject_tgpartners.embedSWF(tgpartner_url + 'img/banner_partners_' + tgpartner_bannersize  + '.swf', 'tg_partner_banner_container_' + tgpartner_bannersize + '_' + tgpartner_unique, tgpartner_dimensions[0], tgpartner_dimensions[1], "8.0.0", "expressInstall.swf", flashvars, params);
    return true;
}