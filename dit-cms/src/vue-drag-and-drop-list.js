/*!
 * Vue-drag-and-drop-list.js v0.8.2
 * (c) 2016 Hejx
 * Released under the MIT License.
 * https://github.com/Alex-fun/vue-drag-and-drop-list#readme
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
      (global.DragAndDropList = factory());
}(this, (function () {
  'use strict';

  let DragAndDropList = {};

  DragAndDropList.install = function (Vue) {
    // save status
    Vue.directive('dnd-draggable', function (el, binding, vnode) {
      let status = true;
      if (binding.value.dndDisableIf) status = false;
      el.setAttribute('draggable', status);
      el.addEventListener('dragstart', handleDragstart.bind(event, el, binding), false);
      el.addEventListener('dragend', handleDragend.bind(event, el, binding), false);
      el.addEventListener('click', handleClick.bind(event, binding), false);
      //el.addEventListener('selectstart', handleSelected, false);
    });

    Vue.directive('dnd-list', function (el, binding, vnode) {

      placeholderNode = getPlaceholderElement(el);
      listNode = el;
      placeholderNode.parentNode && placeholderNode.parentNode.removeChild(placeholderNode);
      horizontal = binding.value.dndHorizontalList;
      externalSources = binding.value.dndExternalSources;

      // bind events
      el.addEventListener('dragenter', handleDragenter.bind(el, binding, event), false);
      el.addEventListener('dragover', handleDragover.bind(el, binding, event), false);
      el.addEventListener('drop', handleDrop.bind(el, binding, event), false);
      el.addEventListener('dragleave', handleDragleave.bind(el, binding, event), false);
    });

    Vue.directive('dnd-nodrag', function (el) {

      el.setAttribute('draggable', true);
      el.addEventListener('dragstart', handleNoDragstart, false);
      el.addEventListener('dragend', handleNoDragend, false);
    });

    Vue.directive('dnd-handle', function (el, binding) {

      el.setAttribute('draggable', true);
      el.addEventListener('dragstart', handle.bind(el, binding, event), false);
      el.addEventListener('dragend', handle.bind(el, binding, event), false);
    });

    let dndDropEffectWorkaround = {}, dndDragTypeWorkaround = {}, placeholderNode, listNode, horizontal = null, externalSources = null

    let handleDragstart = function (el, binding, event) {

      event = event.originalEvent || event;

      let dndDraggable = JSON.stringify(binding.value.dndDraggable);
      // Check whether the element is draggable, since dragstart might be triggered on a child.
      if (dndDraggable == 'false') return true;

      // Serialize the data associated with this element. IE only supports the Text drag type
      event.dataTransfer.setData("Text", dndDraggable);

      // Only allow actions specified in dnd-effect-allowed attribute
      event.dataTransfer.effectAllowed = binding.value.dndEffectAllowed || "move";

      // Add CSS classes. IE9 not support 'classList'
      el.className = el.className.trim() + " dndDragging";
      setTimeout(function () {
        el.className = el.className.trim() + " dndDraggingSource";
      }.bind(this), 0);

      // Workarounds for stupid browsers, see description below
      dndDropEffectWorkaround.dropEffect = "none";
      dndDragTypeWorkaround.isDragging = true;

      // Save type of item in global state. Usually, this would go into the dataTransfer
      // typename, but we have to use "Text" there to support IE
      dndDragTypeWorkaround.dragType = binding.value.dndType || undefined;

      // Try setting a proper drag image if triggered on a dnd-handle (won't work in IE).
      if (event._dndHandle && event.dataTransfer.setDragImage) {
        event.dataTransfer.setDragImage(el, event._dndHandleLeft - el.getBoundingClientRect().left, event._dndHandleTop - el.getBoundingClientRect().top);
      }

      // Invoke callback
      if (typeof(binding.value.dndDragstart) === 'function') {
        binding.value.dndDragstart.call(this, event.target);
      }
      event.stopPropagation();
    };

    let handleDragend = function (el, binding, event) {
      event = event.originalEvent || event;

      let dropEffect = dndDropEffectWorkaround.dropEffect;
      switch (dropEffect) {
        case "move":
          if (typeof(binding.value.dndMoved) === 'function') {
            binding.value.dndMoved.call(this, binding.value.dndData, binding.value.dndIndex, event.target);
          } else {
            binding.value.dndData.splice(binding.value.dndIndex, 1);
          }
          break;
        case "copy":
          if (typeof(binding.value.dndCopied) === 'function') {
            binding.value.dndCopied.call(this, binding.value.dndDraggable, event.target);
          }
          break;
        case "none":
          if (typeof(binding.value.dndCanceled) === 'function') {
            binding.value.dndCanceled.call(this, event.target);
          }
          break;
      }
      if (typeof(binding.value.dndDragend) === 'function') {
        binding.value.dndDragend.call(this, dropEffect, event.target);
      }

      // Clean up
      el.className = el.className.replace("dndDragging", "").trim();
      let _el = el;
      setTimeout(function () {
        // here this.el will be null
        _el.className = _el.className.replace("dndDraggingSource", "").trim();
      }, 0);
      dndDragTypeWorkaround.isDragging = false;
      event.stopPropagation();
    };

    let handleClick = function (binding, event) {
      if (!binding.value.dndSelected) return;

      event = event.originalEvent || event;
      if (typeof(binding.value.dndSelected) === 'function') {
        binding.value.dndSelected.call(this, binding.value.dndData[binding.value.dndIndex], event.target);
      }
      event.stopPropagation();
    };

    /**
     * Workaround to make element draggable in IE9
     * http://stackoverflow.com/questions/5500615/internet-explorer-9-drag-and-drop-dnd
     */
    //let handleSelected = function () {
    //  if (this.dragDrop) this.dragDrop();
    //  return false;
    //}

    let handleDragenter = function (el, binding, event) {
      //console.log(el)  //Vue el this
      //console.log(binding)  //ProgressEvent
      //console.log(event)    //DragEvent

      event = event.originalEvent || event;
      if (!isDropAllowed.call(event, el)) return true;
      event.preventDefault();
    }

    let handleDragover = function (el, binding, event) {
      placeholderNode = getPlaceholderElement(this)
      listNode = this
      event = event.originalEvent || event;

      if (!isDropAllowed.call(event, el)) return true;

      if (placeholderNode.parentNode != listNode) {
        listNode.appendChild(placeholderNode);
      }

      if (event.target !== listNode) {
        // Try to find the node direct directly below the list node.
        let listItemNode = event.target;
        while (listItemNode.parentNode !== listNode && listItemNode.parentNode) {
          listItemNode = listItemNode.parentNode;
        }
        if (listItemNode.parentNode === listNode && listItemNode !== placeholderNode) {
          // If the mouse pointer is in the upper half of the child element,
          // we place it before the child element, otherwise below it.
          if (isMouseInFirstHalf(event, listItemNode)) {
            listNode.insertBefore(placeholderNode, listItemNode);
          } else {
            listNode.insertBefore(placeholderNode, listItemNode.nextSibling);
          }
        }
      } else {
        // This branch is reached when we are dragging directly over the list element.
        // Usually we wouldn't need to do anything here, but the IE does not fire it's
        // events for the child element, only for the list directly. Therefore, we repeat
        // the positioning algorithm for IE here.
        if (isMouseInFirstHalf(event, placeholderNode, true)) {
          // Check if we should move the placeholder element one spot towards the top.
          // Note that display none elements will have offsetTop and offsetHeight set to
          // zero, therefore we need a special check for them.
          while (placeholderNode.previousElementSibling
          && (isMouseInFirstHalf(event, placeholderNode.previousElementSibling, true)
          || placeholderNode.previousElementSibling.offsetHeight === 0)) {
            listNode.insertBefore(placeholderNode, placeholderNode.previousElementSibling);
          }
        } else {
          // Check if we should move the placeholder element one spot towards the bottom
          while (placeholderNode.nextElementSibling && !isMouseInFirstHalf(event, placeholderNode.nextElementSibling, true)) {
            listNode.insertBefore(placeholderNode,
              placeholderNode.nextElementSibling.nextElementSibling);
          }
        }
      }

      // At this point we invoke the callback, which still can disallow the drop.
      // We can't do this earlier because we want to pass the index of the placeholder.
      if (el.value.dndDragover && !invokeCallback.call(this, el, 'dndDragover', event, getPlaceholderIndex(this))) {
        return stopDragover.call(this, event);
      }

      if (this.className.indexOf("dndDragover") < 0) this.className = this.className.trim() + " dndDragover";

      event.preventDefault();
      event.stopPropagation();
      return false;
    };

    let handleDrop = function (el, binding, event) {
      event = event.originalEvent || event;

      if (!isDropAllowed.call(event, el)) return true;

      // The default behavior in Firefox is to interpret the dropped element as URL and
      // forward to it. We want to prevent that even if our drop is aborted.
      event.preventDefault();

      // Unserialize the data that was serialized in dragstart. According to the HTML5 specs,
      // the "Text" drag type will be converted to text/plain, but IE does not do that.
      let data = event.dataTransfer.getData("Text") || event.dataTransfer.getData("text/plain");
      let transferredObject;
      try {
        transferredObject = JSON.parse(data);
      } catch (e) {
        return stopDragover.call(this);
      }

      // Invoke the callback, which can transform the transferredObject and even abort the drop.
      let index = getPlaceholderIndex(this);
      if (el.value.dndDrop) {
        transferredObject = invokeCallback.call(this, el, 'dndDrop', event, index, transferredObject);
        if (!transferredObject) {
          return stopDragover.call(this);
        }
      }

      // Insert the object into the array, unless dnd-drop took care of that (returned true).
      if (transferredObject !== true) {
        el.value.dndList.splice(index, 0, transferredObject);
      }

      //invokeCallback.call(this, el, 'dndInserted', event, index, transferredObject);
      // In Chrome on Windows the dropEffect will always be none...
      // We have to determine the actual effect manually from the allowed effects
      if (event.dataTransfer.dropEffect === "none") {
        if (event.dataTransfer.effectAllowed === "copy" ||
          event.dataTransfer.effectAllowed === "move") {
          dndDropEffectWorkaround.dropEffect = event.dataTransfer.effectAllowed;
        } else {
          dndDropEffectWorkaround.dropEffect = event.ctrlKey ? "copy" : "move";
        }
      } else {
        dndDropEffectWorkaround.dropEffect = event.dataTransfer.dropEffect;
      }

      // Clean up
      stopDragover.call(this);
      event.stopPropagation();
      return false;
    };

    // drag leave
    let handleDragleave = function (el, binding, event) {
      event = event.originalEvent || event;
      this.className = this.className.replace("dndDragover", "").trim();
      setTimeout(function () {
        if (this.className.indexOf("dndDragover") < 0) {
          placeholderNode.parentNode && placeholderNode.parentNode.removeChild(placeholderNode);
        }
      }.bind(this), 100);
    };

    let handleNoDragstart = function (event) {
      event = event.originalEvent || event;

      if (!event._dndHandle) {
        // If a child element already reacted to dragstart and set a dataTransfer object, we will
        // allow that. For example, this is the case for user selections inside of input elements.
        if (!(event.dataTransfer.types && event.dataTransfer.types.length)) {
          event.preventDefault();
        }
        event.stopPropagation();
      }
    };

    let handleNoDragend = function (event) {
      event = event.originalEvent || event;
      if (!event._dndHandle) {
        event.stopPropagation();
      }
    };

    let handle = function (el, binding, event) {
      event = event.originalEvent || event;
      event._dndHandle = true;
      event._dndHandleLeft = el.getBoundingClientRect().left;
      event._dndHandleTop = el.getBoundingClientRect().top;
    };

    /**
     * Tries to find a child element that has the dndPlaceholder class set. If none was found, a
     * new li element is created.
     */
    function getPlaceholderElement(elem) {
      if (elem.parentNode) {
        let placeholder, oldLi = elem.parentNode.querySelectorAll('.dndPlaceholder');
        if (oldLi.length > 0) {
          placeholder = oldLi[0];
          return placeholder;
        }
      }
      let newLi = document.createElement('li');
      newLi.setAttribute('class', 'dndPlaceholder');
      return newLi;
    };

    function getPlaceholderIndex(el) {
      return Array.prototype.indexOf.call(el.childNodes, placeholderNode);
    };

    /**
     * Checks various conditions that must be fulfilled for a drop to be allowed
     */
    function isDropAllowed(binding) {
      //console.log(event)
      //console.log(binding)
      // Disallow drop from external source unless it's allowed explicitly.
      if (!dndDragTypeWorkaround.isDragging && !externalSources) return false;

      // Check mimetype. Usually we would use a custom drag type instead of Text, but IE doesn't
      // support that.
      if (!hasTextMimetype(this.dataTransfer.types)) return false;

      // Now check the dnd-allowed-types against the type of the incoming element. For drops from
      // external sources we don't know the type, so it will need to be checked via dnd-drop.
      if (binding.value.dndAllowedTypes && dndDragTypeWorkaround.isDragging) {
        let allowed = binding.value.dndAllowedTypes;
        if (Array.isArray(allowed) && allowed.indexOf(dndDragTypeWorkaround.dragType) === -1) {
          return false;
        }
      }

      // Check whether droping is disabled completely
      if (binding.value.dndDisableIf) return false;

      return true;
    }

    /**
     * Small helper function that cleans up if we aborted a drop.
     */
    function stopDragover() {
      placeholderNode.parentNode && placeholderNode.parentNode.removeChild(placeholderNode);
      this.className = this.className.replace("dndDragover", "").trim();
      return true;
    }

    /**
     * Invokes a callback with some interesting parameters and returns the callbacks return value.
     */
    function invokeCallback(binding, expression, event, index, item) {
      return binding.value[expression]({
        event: event,
        index: index,
        item: item || undefined,
        external: !dndDragTypeWorkaround.isDragging,
        type: dndDragTypeWorkaround.isDragging ? dndDragTypeWorkaround.dragType : undefined
      });
    }

    /**
     * Check if the dataTransfer object contains a drag type that we can handle. In old versions
     * of IE the types collection will not even be there, so we just assume a drop is possible.
     */
    function hasTextMimetype(types) {
      if (!types) return true;
      for (let i = 0; i < types.length; i++) {
        if (types[i] === "Text" || types[i] === "text/plain") return true;
      }

      return false;
    }

    // Checks whether the mouse pointer is in the first half of the given target element.
    function isMouseInFirstHalf(event, targetNode, relativeToParent) {
      let mousePointer = horizontal ? (event.offsetX || event.layerX)
        : (event.offsetY || event.layerY);
      let targetSize = horizontal ? targetNode.offsetWidth : targetNode.offsetHeight;
      let targetPosition = horizontal ? targetNode.offsetLeft : targetNode.offsetTop;
      targetPosition = relativeToParent ? targetPosition : 0;
      return mousePointer < targetPosition + targetSize / 2;
    };
  };

  return DragAndDropList;
})));
