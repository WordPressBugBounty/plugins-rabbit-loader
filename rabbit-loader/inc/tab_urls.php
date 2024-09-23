<?php

if (class_exists('RabbitLoader_21_Tab_Urls')) {
    #it seems we have a conflict
    return;
}

class RabbitLoader_21_Tab_Urls extends RabbitLoader_21_Tab_Init
{

    public static function init()
    {
        add_settings_section(
            'rabbitloader_section_urls',
            ' ',
            '',
            'rabbitloader-urls'
        );
    }

    public static function echoMainContent()
    {

        do_settings_sections('rabbitloader-urls');
        $overview = self::getOverviewData($apiError, $apiMessage);
?>
        <div class="" style="max-width: 1160px; margin:40px auto;">
            <div class="row mb-4">
                <div class="col-sm-12 col-md-4">
                    <?php self::urls_detected_box($overview, false); ?>
                </div>
                <div class="col-sm-12 col-md-4">
                    <div class="bg-white rounded p-4">
                        <h4 class="" title=""><?php echo $overview['score_circle_best']; ?>/<small style="font-size:14px;">100</small></h4>
                        <span class="text-secondary mt-2"><?php RL21UtilWP::_e('Best SpeedScore So Far'); ?></span>
                    </div>
                </div>
                <div class="col-sm-12 col-md-4">
                    <div class="bg-white rounded p-4">
                        <h4 class="" title=""><?php echo $overview['score_circle_avg']; ?>/<small style="font-size:14px;">100</small></h4>
                        <span class="text-secondary mt-2"><?php RL21UtilWP::_e('Avg SpeedScore Achieved'); ?></span>
                    </div>
                </div>
            </div>
            <div class="row mb-4">
                <div class="col">
                    <!-- <div class="bg-white rounded py-4">
                        <div class="row">
                            <div class="col-12 text-secondary">
                                <h5 class="px-4">URLs</h5>
                                <span class="d-block px-4">This table shows all canonical URLs detected on the website irrespective of optimization and exclusion status.</span>
                            </div>
                        </div>
                        <div class="mt-4">
                            <table class="table rl-table" id="table_page_score" style="width:100%">
                            </table>
                        </div>
                    </div> -->
                    <div class="mt-4 rl-mfe-comp" id="mfe_table_page_score">
                    </div>
                </div>
            </div>
        </div>
<?php
    }
}

?>