export default class CustomPalette {
  static $inject = ['palette', 'create', 'elementFactory'];

  private _create: any;
  private _elementFactory: any;

  constructor(palette: any, create: any, elementFactory: any) {
    this._create = create;
    this._elementFactory = elementFactory;
    palette.registerProvider(this);
  }

  getPaletteEntries() {
    const { _create, _elementFactory } = this;

    const createCustomCircle = (id: string, title: string) => ({
      group: 'custom',
      className: 'bpmn-icon-start-event-none', // ظاهر دایره مثل Start Event
      title,
      action: {
        dragstart: (event: any) => {
          const shape = _elementFactory.createShape({
            type: `custom:${id}`, // type کاملا سفارشی، bpmn-js شکل پیش‌فرض نمی‌سازه
            businessObject: _elementFactory._bpmnFactory.create('bpmn:StartEven') // businessObject واقعی برای propertyها
          });
          (shape.businessObject as any).customType = id;
          _create.start(event, shape);
        },
        click: (event: any) => {
          const shape = _elementFactory.createShape({
            type: `custom:${id}`,
            businessObject: _elementFactory._bpmnFactory.create('bpmn:StartEven')
          });
          (shape.businessObject as any).customType = id;
          _create.start(event, shape);
        }
      }
    });

    return {
      'circle-1': createCustomCircle('circle-1', 'دایره 1'),
      'circle-2': createCustomCircle('circle-2', 'دایره 2'),
      'circle-3': createCustomCircle('circle-3', 'دایره 3')
    };
  }
}
