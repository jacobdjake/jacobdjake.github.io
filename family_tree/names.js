function init() {
      if (window.goSamples) goSamples();  // init for these samples -- you don't need to call this
      var $ = go.GraphObject.make;  // for conciseness in defining templates

      myDiagram =
        $(go.Diagram, "myDiagramDiv",  // must be the ID or reference to div
          {
            "toolManager.hoverDelay": 100,  // 100 milliseconds instead of the default 850
            allowCopy: false,
            layout:  // create a TreeLayout for the family tree
              $(go.TreeLayout,
                { angle: 90, nodeSpacing: 10, layerSpacing: 40, layerStyle: go.TreeLayout.LayerUniform })
          });

      var bluegrad = '#90CAF9';
      var pinkgrad = '#F48FB1';

      // Set up a Part as a legend, and place it directly on the diagram
      myDiagram.add(
        $(go.Part, "Table",
          { position: new go.Point(300, 10), selectable: false },
          $(go.TextBlock, "Key",
            { row: 0, font: "700 14px Droid Serif, sans-serif" }),  // end row 0
          $(go.Panel, "Horizontal",
            { row: 1, alignment: go.Spot.Left },
            $(go.Shape, "Rectangle",
              { desiredSize: new go.Size(30, 30), fill: bluegrad, margin: 5 }),
            $(go.TextBlock, "Male",
              { font: "700 13px Droid Serif, sans-serif" })
          ),  // end row 1
          $(go.Panel, "Horizontal",
            { row: 2, alignment: go.Spot.Left },
            $(go.Shape, "Rectangle",
              { desiredSize: new go.Size(30, 30), fill: pinkgrad, margin: 5 }),
            $(go.TextBlock, "Female",
              { font: "700 13px Droid Serif, sans-serif" })
          )  // end row 2
        ));

      // get tooltip text from the object's data
      function tooltipTextConverter(person) {
        var str = "";
        //if (person.birthYear !== undefined) str += "Born: " + person.birthYear;
        //if (person.deathYear !== undefined) str += "\nDied: " + person.deathYear;
        if (person.married !== undefined) str += "Married: " + person.married;
		if (person.mother !== undefined) str += "\nMaother: " + person.mother;
        return str;
      }

      // define tooltips for nodes
      var tooltiptemplate =
        $("ToolTip",
          { "Border.fill": "whitesmoke", "Border.stroke": "black" },
          $(go.TextBlock,
            {
              font: "bold 8pt Helvetica, bold Arial, sans-serif",
              wrap: go.TextBlock.WrapFit,
              margin: 5
            },
            new go.Binding("text", "", tooltipTextConverter))
        );

      // define Converters to be used for Bindings
      function genderBrushConverter(gender) {
        if (gender === "M") return bluegrad;
        if (gender === "F") return pinkgrad;
        return "orange";
      }

      // replace the default Node template in the nodeTemplateMap
      myDiagram.nodeTemplate =
        $(go.Node, "Auto",
          { deletable: false, toolTip: tooltiptemplate },
          new go.Binding("text", "name"),
          $(go.Shape, "Rectangle",
            {
              fill: "lightgray",
              stroke: null, strokeWidth: 0,
              stretch: go.GraphObject.Fill,
              alignment: go.Spot.Center
            },
            new go.Binding("fill", "gender", genderBrushConverter)),
          $(go.TextBlock,
            {
              font: "700 12px Droid Serif, sans-serif",
              textAlign: "center",
              margin: 10, maxSize: new go.Size(80, NaN)
            },
            new go.Binding("text", "name"))
        );

      // define the Link template
      myDiagram.linkTemplate =
        $(go.Link,  // the whole link panel
          { routing: go.Link.Orthogonal, corner: 5, selectable: false },
          $(go.Shape, { strokeWidth: 3, stroke: '#424242' }));  // the gray link shape

      // here's the family data
      var nodeDataArray = [
	  // marceline - marcelina
        { key: 0, name: "Cano - Daliw", gender: "M", married: "Daliw" },
			{ key: 2, parent: 0, name: "Marceline", gender: "F", married: "Arcenio Sr." },
				{ key: 3, parent: 2, name: "Elfred (Cano)", gender: "M", married: "Rosmarie" },
					{ key: 9, parent: 3, name: "Walt", gender: "M", married: "Susef" },
						{ key: 31, parent: 9, name: "Redrick", gender: "M" },
						{ key: 32, parent: 9, name: "Haseo", gender: "M" },
						{ key: 33, parent: 9, name: "Jihoon", gender: "M" },
					{ key: 10, parent: 3, name: "Lylmar Eiramsor (Gosipeng)", gender: "F" },
						{ key: 34, parent: 10, name: "Dwayne Las Marias (Ramboy)", gender: "M" },
					{ key: 11, parent: 3, name: "Dana Xanthea (Ibing)", gender: "F", married: "Noue" },
						{ key: 35, parent: 11, name: "Thea Aralhee (Malipan)", gender: "F" },
				{ key: 4, parent: 2, name: "Philbert (Ban-ang)", gender: "M" },
					{ key: 12, parent: 4, name: "Phiels (Konaya)", gender: "F", mother: "Alfha" },
				{ key: 5, parent: 2, name: "Faith", gender: "F", married: "Stephen" },
					{ key: 13, parent: 5, name: "Cheryl (Cawandi)", gender: "F", married: "Darryl Kim" },
					{ key: 14, parent: 5, name: "Levon Jordan (Lig-owen)", gender: "M", married: "Ana" },
						{ key: 35, parent: 14, name: "Ljeana Amara (Daliw)", gender: "F" },
					{ key: 15, parent: 5, name: "Kim Ezra (Kinaod)", gender: "M" },
					{ key: 16, parent: 5, name: "Jacob (Taca)", gender: "M" },
				{ key: 6, parent: 2, name: "Nelia", gender: "F", married: "Ronald Sr." },
					{ key: 17, parent: 6, name: "Sherwai (Mokyat)", gender: "M" },
					{ key: 18, parent: 6, name: "Cameron (Fagyan)", gender: "M" },
					{ key: 19, parent: 6, name: "Basil (Cano)", gender: "M" },
					{ key: 20, parent: 6, name: "Ronald Jr. (RJ)", gender: "M" },
				{ key: 7, parent: 2, name: "Anastacio", gender: "M", married: "Lyn" },
					{ key: 21, parent: 7, name: "Odali Anne", gender: "F" },
				{ key: 8, parent: 2, name: "Arcenio Jr.", gender: "M", married: "Maralyn" },
					{ key: 22, parent: 8, name: "Kaye", gender: "F" },
					{ key: 23, parent: 8, name: "Cody Craig", gender: "M" },
		// Emily			
			{ key: 1, parent: 0, name: "Emily", gender: "F", married: "William" },
				{ key: 24, parent: 1, name: "Nena (Ining)", gender: "F", married: "Douglas" },
					{ key: 36, parent: 24, name: "Remedios (Bag-an)", gender: "F", married: "Dado" },
						{ key: 54, parent: 36, name: "Rashel", gender: "F" },
					{ key: 37, parent: 24, name: "Ricardo", gender: "M" },
					{ key: 38, parent: 24, name: "Danny", gender: "M" },
					{ key: 39, parent: 24, name: "Leslie Ann", gender: "F", married: "Leon" },
						{ key: 55, parent: 39, name: "William", gender: "M" },
					{ key: 40, parent: 24, name: "Allan", gender: "M" },
					{ key: 40, parent: 24, name: "Nestor", gender: "M" },
					{ key: 41, parent: 24, name: "Meady", gender: "F" },
				{ key: 25, parent: 1, name: "Emelia", gender: "F", married: "Anthony" },
					{ key: 42, parent: 25, name: "Dwight", gender: "M", married: "Placeholder" },
						{ key: 56, parent: 42, name: "Placeholder", gender: "M" },
					{ key: 43, parent: 25, name: "Eden", gender: "F", married: "Bumin" },
						{ key: 57, parent: 43, name: "Larraine Christy", gender: "F" },
					{ key: 44, parent: 25, name: "Pederico", gender: "M", married: "Placeholder" },
						{ key: 58, parent: 44, name: "Eric", gender: "M" },
						{ key: 59, parent: 44, name: "(Gatsalian)", gender: "M" },
					{ key: 45, parent: 25, name: "Miriam", gender: "F", married: "Placeholder" },
				{ key: 26, parent: 1, name: "Lino", gender: "M", married: "Rita" },
					{ key: 46, parent: 26, name: "Rileen", gender: "F" },
				{ key: 27, parent: 1, name: "Nenita", gender: "F", married: "Dennis" },
					{ key: 47, parent: 27, name: "Bradley", gender: "M", married: "Placeholder" },
						{ key: 60, parent: 47, name: "Placeholder", gender: "M" },
					{ key: 48, parent: 27, name: "Camiyeng", gender: "M" },
				{ key: 28, parent: 1, name: "Bernice", gender: "F", married: "Paul" },
					{ key: 49, parent: 28, name: "Kevin (Willi)", gender: "M" },
					{ key: 50, parent: 28, name: "Kristel (Ugamay)", gender: "F", married: "Placeholder" },
					{ key: 51, parent: 28, name: "Kurt", gender: "M" },
					{ key: 52, parent: 28, name: "Vladimir Bal", gender: "M" },
					{ key: 53, parent: 28, name: "Krishna Suana", gender: "F" },
				{ key: 29, parent: 1, name: "Jose", gender: "M" },
				{ key: 30, parent: 1, name: "Eddie (Edu)", gender: "M" }
      ];

      // create the model for the family tree
      myDiagram.model = new go.TreeModel(nodeDataArray);

      document.getElementById('zoomToFit').addEventListener('click', function() {
        myDiagram.commandHandler.zoomToFit();
      });

      document.getElementById('centerRoot').addEventListener('click', function() {
        myDiagram.scale = 1;
        myDiagram.scrollToRect(myDiagram.findNodeForKey(0).actualBounds);
      });

    }
