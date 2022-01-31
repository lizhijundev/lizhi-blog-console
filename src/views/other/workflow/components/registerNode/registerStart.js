export default function registerStart(lf) {
  lf.register('start', ({ CircleNode, CircleNodeModel, h }) => {
    class StartNode extends CircleNode {
      getLabelShape() {
        const { x, y } = this.props.model
        return h(
          'text',
          {
            fill: '#000000',
            fontSize: 12,
            x: x - 13,
            y: y + 4,
            width: 50,
            height: 25,
          },
          'Start'
        )
      }

      getShape() {
        const { model } = this.props
        const { x, y } = model
        const style = model.getNodeStyle()
        return h('g', {}, [
          h('circle', {
            ...style,
            cx: x,
            cy: y,
          }),
          this.getLabelShape(),
        ])
      }
    }

    class StartModel extends CircleNodeModel {
      constructor(data, graphModel) {
        data.text = {
          value: (data.text && data.text.value) || '',
          x: data.x,
          y: data.y + 35,
          dragable: false,
          editable: true,
        }
        super(data, graphModel)
      }

      getConnectedTargetRules() {
        const rules = super.getConnectedTargetRules()
        const notAsTarget = {
          message: '起始节点不能作为连线的终点',
          validate: () => false,
        }
        rules.push(notAsTarget)
        return rules
      }
    }

    return {
      view: StartNode,
      model: StartModel,
    }
  })
}
