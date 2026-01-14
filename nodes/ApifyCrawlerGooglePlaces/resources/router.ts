import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeProperties,
	NodeOperationError,
} from 'n8n-workflow';
import {
	RESOURCE_NAME,
	resourceOption,
	properties as resourceProperties,
	router as resourceRouter,
} from './resource';

// Re-export resource and operation names for backward compatibility
export { RESOURCE_NAME } from './resource';
export { OPERATION_SCRAPE_PLACES_WITH_ADVANCED_OPTIONS_NAME } from './operations/scrapePlacesWithAdvancedOptions';

// Resource selector with all resources
const resourceSelect: INodeProperties[] = [
	{
		displayName: 'Resource',
		name: 'resource',
		type: 'options',
		noDataExpression: true,
		options: [
			resourceOption,
		],
		default: '',
	},
];

// Authentication properties
const authenticationProperties: INodeProperties[] = [
	{
		displayName: 'Authentication',
		name: 'authentication',
		type: 'options',
		options: [
			{ name: 'API Key', value: 'apifyApi' },
			{ name: 'OAuth2', value: 'apifyOAuth2Api' },
		],
		default: 'apifyApi',
		description: 'Choose which authentication method to use',
	},
];

// All properties exported to the main node
export const properties: INodeProperties[] = [
	...authenticationProperties,
	...resourceSelect,
	...resourceProperties,
];

export const methods = {};

// Main router that delegates to resource-specific routers
export async function router(
	this: IExecuteFunctions,
	i: number,
): Promise<INodeExecutionData | INodeExecutionData[]> {
	const resource = this.getNodeParameter('resource', 0);

	switch (resource) {
		case RESOURCE_NAME:
			return await resourceRouter.call(this, i);
		default:
			throw new NodeOperationError(this.getNode(), `Resource ${resource} not found`);
	}
}
