/**
 * Custom Palette Provider for BPMN.js
 * Provides a custom palette with BPMN elements
 */
export default class CustomPalette {
    private _create: any;
    private _elementFactory: any;
    private _spaceTool: any;
    private _lassoTool: any;
    private _handTool: any;
    private _globalConnect: any;
    private _translate: any;

    constructor(
        palette: any,
        create: any,
        elementFactory: any,
        spaceTool: any,
        lassoTool: any,
        handTool: any,
        globalConnect: any,
        translate: any
    ) {
        this._create = create;
        this._elementFactory = elementFactory;
        this._spaceTool = spaceTool;
        this._lassoTool = lassoTool;
        this._handTool = handTool;
        this._globalConnect = globalConnect;
        this._translate = translate;

        palette.registerProvider(this);
    }

    getPaletteEntries(): any {
        const {
            _create: create,
            _elementFactory: elementFactory,
            _spaceTool: spaceTool,
            _lassoTool: lassoTool,
            _handTool: handTool,
            _globalConnect: globalConnect,
            _translate: translate,
        } = this;

        function createAction(
            type: string,
            group: string,
            className: string,
            title: string,
            options?: any
        ) {
            function createListener(event: any) {
                const shape = elementFactory.createShape({
                    type: type,
                    ...options,
                });

                if (options) {
                    const bo = shape.businessObject;
                    if (bo.di) {
                        bo.di.isExpanded = options.isExpanded;
                    }
                }

                create.start(event, shape);
            }

            return {
                group: group,
                className: className,
                title: translate(title),
                action: {
                    dragstart: createListener,
                    click: createListener,
                },
            };
        }

        function createParticipant(event: any, collapsed: boolean) {
            create.start(event, elementFactory.createParticipantShape(collapsed));
        }

        return {
            // ============================================
            // Tools
            // ============================================
            'hand-tool': {
                group: 'tools',
                className: 'bpmn-icon-hand-tool',
                title: translate('Activate the hand tool'),
                action: {
                    click: function (event: any) {
                        handTool.activateHand(event);
                    },
                },
            },
            'lasso-tool': {
                group: 'tools',
                className: 'bpmn-icon-lasso-tool',
                title: translate('Activate the lasso tool'),
                action: {
                    click: function (event: any) {
                        lassoTool.activateSelection(event);
                    },
                },
            },
            'space-tool': {
                group: 'tools',
                className: 'bpmn-icon-space-tool',
                title: translate('Activate the create/remove space tool'),
                action: {
                    click: function (event: any) {
                        spaceTool.activateSelection(event);
                    },
                },
            },
            'global-connect-tool': {
                group: 'tools',
                className: 'bpmn-icon-connection-multi',
                title: translate('Activate the global connect tool'),
                action: {
                    click: function (event: any) {
                        globalConnect.start(event);
                    },
                },
            },
            'tool-separator': {
                group: 'tools',
                separator: true,
            },

            // ============================================
            // Events
            // ============================================
            'create.start-event': createAction(
                'bpmn:StartEvent',
                'event',
                'bpmn-icon-start-event-none',
                'Create StartEvent'
            ),
            'create.intermediate-event': createAction(
                'bpmn:IntermediateThrowEvent',
                'event',
                'bpmn-icon-intermediate-event-none',
                'Create Intermediate/Boundary Event'
            ),
            'create.end-event': createAction(
                'bpmn:EndEvent',
                'event',
                'bpmn-icon-end-event-none',
                'Create EndEvent'
            ),
            'event-separator': {
                group: 'event',
                separator: true,
            },

            // ============================================
            // Gateways
            // ============================================
            'create.exclusive-gateway': createAction(
                'bpmn:ExclusiveGateway',
                'gateway',
                'bpmn-icon-gateway-xor',
                'Create Gateway'
            ),
            'create.parallel-gateway': createAction(
                'bpmn:ParallelGateway',
                'gateway',
                'bpmn-icon-gateway-parallel',
                'Create Parallel Gateway'
            ),
            'gateway-separator': {
                group: 'gateway',
                separator: true,
            },

            // ============================================
            // Tasks
            // ============================================
            'create.task': createAction(
                'bpmn:Task',
                'activity',
                'bpmn-icon-task',
                'Create Task'
            ),
            'create.user-task': createAction(
                'bpmn:UserTask',
                'activity',
                'bpmn-icon-user-task',
                'Create User Task'
            ),
            'create.service-task': createAction(
                'bpmn:ServiceTask',
                'activity',
                'bpmn-icon-service-task',
                'Create Service Task'
            ),
            'create.subprocess-expanded': createAction(
                'bpmn:SubProcess',
                'activity',
                'bpmn-icon-subprocess-expanded',
                'Create expanded SubProcess',
                { isExpanded: true }
            ),
            'activity-separator': {
                group: 'activity',
                separator: true,
            },

            // ============================================
            // Data
            // ============================================
            'create.data-object': createAction(
                'bpmn:DataObjectReference',
                'data',
                'bpmn-icon-data-object',
                'Create DataObjectReference'
            ),
            'create.data-store': createAction(
                'bpmn:DataStoreReference',
                'data',
                'bpmn-icon-data-store',
                'Create DataStoreReference'
            ),
            'data-separator': {
                group: 'data',
                separator: true,
            },

            // ============================================
            // Participants (Pools/Lanes)
            // ============================================
            'create.participant-expanded': {
                group: 'collaboration',
                className: 'bpmn-icon-participant',
                title: translate('Create Pool/Participant'),
                action: {
                    dragstart: function (event: any) {
                        createParticipant(event, false);
                    },
                    click: function (event: any) {
                        createParticipant(event, false);
                    },
                },
            },
            'create.group': createAction(
                'bpmn:Group',
                'artifact',
                'bpmn-icon-group',
                'Create Group'
            ),
        };
    }
}

// Dependency Injection
(CustomPalette as any).$inject = [
    'palette',
    'create',
    'elementFactory',
    'spaceTool',
    'lassoTool',
    'handTool',
    'globalConnect',
    'translate',
];