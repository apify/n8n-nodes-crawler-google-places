import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeProperties,
	INodePropertyOptions,
	NodeOperationError,
} from 'n8n-workflow';
import {
	OPERATION_SCRAPE_PLACES_WITH_ADVANCED_OPTIONS_NAME,
	option as scrapePlacesWithAdvancedOptionsOption,
	getProperties as getScrapePlacesWithAdvancedOptionsProperties,
	execute as executeScrapePlacesWithAdvancedOptions,
} from './operations/scrapePlacesWithAdvancedOptions';
import {
	OPERATION_SCRAPE_PLACE_REVIEWS_NAME,
	option as scrapePlaceReviewsOption,
	getProperties as getScrapePlaceReviewsProperties,
	execute as executeScrapePlaceReviews,
} from './operations/scrapePlaceReviews';
import {
	OPERATION_GENERATE_COMPANY_AND_BUSINESS_LEADS_NAME,
	option as generateCompanyAndBusinessLeadsOption,
	getProperties as getGenerateCompanyAndBusinessLeadsProperties,
	execute as executeGenerateCompanyAndBusinessLeads,
} from './operations/generateCompanyAndBusinessLeads';

// Resource name constant
export const RESOURCE_NAME = 'Google Maps Scraper';

// Collect all operations for this resource
const operations: INodePropertyOptions[] = [
	scrapePlacesWithAdvancedOptionsOption,
	scrapePlaceReviewsOption,
	generateCompanyAndBusinessLeadsOption,
];

// Resource option for the resource selector
export const resourceOption: INodePropertyOptions = {
	name: RESOURCE_NAME,
	value: RESOURCE_NAME,
};

// Operation selector for this resource
export const operationSelect: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: [RESOURCE_NAME],
		},
	},
	default: operations.length > 0 ? operations[0].value : '',
	options: operations,
};

// Get operation properties with resource name injected
const scrapePlacesWithAdvancedOptionsProperties = getScrapePlacesWithAdvancedOptionsProperties(RESOURCE_NAME);
const scrapePlaceReviewsProperties = getScrapePlaceReviewsProperties(RESOURCE_NAME);
const generateCompanyAndBusinessLeadsProperties = getGenerateCompanyAndBusinessLeadsProperties(RESOURCE_NAME);

// All properties for this resource (operation selector + operation properties)
export const properties: INodeProperties[] = [
	operationSelect,
	...scrapePlacesWithAdvancedOptionsProperties,
	...scrapePlaceReviewsProperties,
	...generateCompanyAndBusinessLeadsProperties,
];

// Router for this resource
export async function router(
	this: IExecuteFunctions,
	i: number,
): Promise<INodeExecutionData | INodeExecutionData[]> {
	const operation = this.getNodeParameter('operation', i);

	switch (operation) {
		case OPERATION_SCRAPE_PLACES_WITH_ADVANCED_OPTIONS_NAME:
			return await executeScrapePlacesWithAdvancedOptions.call(this, i);
		case OPERATION_SCRAPE_PLACE_REVIEWS_NAME:
			return await executeScrapePlaceReviews.call(this, i);
		case OPERATION_GENERATE_COMPANY_AND_BUSINESS_LEADS_NAME:
			return await executeGenerateCompanyAndBusinessLeads.call(this, i);
		default:
			throw new NodeOperationError(
				this.getNode(),
				`Operation ${operation} not found for resource ${RESOURCE_NAME}`,
			);
	}
}
