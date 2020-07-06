<?php

class EntryPoint {

	private $service;

	const NAMESPACE = 'vk-blocks/v1';
	const ROUTE = '/block-meta';
	const BLOCK_NAME = '/(?P<name>.+)';

	public function __construct() {
		add_action( 'rest_api_init', [ $this, '_rest_api_init' ] );
	}

	public function _rest_api_init() {
		register_rest_route(
			self::NAMESPACE,
			self::ROUTE . self::BLOCK_NAME,
			[
				'methods'  => 'GET',
				'callback' => [ $this, '_callback' ],
			]
		);
	}

	public function _callback($request) {

		$block_name = esc_html($request["name"]);



		// $sheetName = esc_html($request["sheetName"]);
		// $sheetRange = esc_html($request["sheetRange"]);
		// $chartWidth = intval($request["chartWidth"]);
		// $chartHeight = intval($request["chartHeight"]);
		// $warning = ["data"=>["status"=>404,"message"=>""]];

		// if($this->is_str_null($sheetId)){
		// 	$warning["data"]["message"] = FetcherWarning::sheet_url();
		// 	return $warning;
		// }

		// if($this->is_str_null($sheetName) && $this->is_str_null($sheetRange)) {
		// 	$warning["data"]["message"] = FetcherWarning::sheet_name_range();
		// 	return $warning;

		// }else{
		// 	if($this->is_str_null($sheetName)){
		// 		$warning["data"]["message"] = FetcherWarning::sheet_name();
		// 		return $warning;

		// 	}else if($this->is_str_null($sheetRange)){
		// 		$warning["data"]["message"] = FetcherWarning::sheet_range_fetcher();
		// 		return $warning;
		// 	}
		// 	$range = esc_html($sheetName) . '!' . esc_html($sheetRange);
		// }

		// $response = $this->service->spreadsheets_values->get($sheetId, $range );
		// $values   = $response->getValues();

		// return rest_ensure_response(["attributes" => ["chartWidth" => $chartWidth, "chartHeight" => $chartHeight],"chartData"=>$values]);


		return rest_ensure_response(["blockName" => $block_name]);
	}

	public function is_str_null($value){
		return $value === "null";
	}
}
